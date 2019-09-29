
import moment from 'moment';
import handleError from '../utils/request/handleError';


function append( list, newList ) {
  newList.forEach(( data ) => {
    const today = moment().format( 'YYYY-MM-DD' );
    const yestoday = moment().add( -1, 'day' ).format( 'YYYY-MM-DD' );
    const sectionKey = moment( data.warnDateTime ).format( 'YYYY-MM-DD' );
    const section = list.find(({ key }) => key === sectionKey );
    if ( section ) {
      section.data.push( data );
    } else {
      list.push({
        key: sectionKey,
        title: today === sectionKey ? '今天' : yestoday === sectionKey ? '昨天' : sectionKey,
        data: [ data ]
      });
    }
  });
  return list;
}

export default {
  namespace: 'message',
  state: {
    listLoading: true,
    list: [],
    isClear: 0,
    pageIndex: 1,
    pageSize: 30,
    pageLimit: 30
  },
  effects: {

    async refresh( action, { put }) {
      await put({
        ...action,
        isRefresh: true,
        type: 'getList',
      });
    },

    async getList({ request, payload, isRefresh }, { put, select }) {

      const { pageSize, pageLimit, list } = await select(({ message }) => message );
      if ( !isRefresh && pageSize > pageLimit ) {
        return;
      }

      await put({
        type: 'update',
        payload: {
          listLoading: true
        }
      });

      try {

        const json = await request( 'warn_list', {
          data: payload
        });

        await put({
          type: 'update',
          payload: {
            list: append( isRefresh ? [] : [...list], json.data.list ),
            pageIndex: json.data.pageInfo.pageIndex,
            pageLimit: json.data.list.length
          }
        });

      } catch( err ) {
        handleError( err );
      } finally {

        await put({
          type: 'update',
          payload: {
            listLoading: false
          }
        });
      }

    }

  },
  reducers: {
    update( state, { payload }) {
      return { ...state, ...payload };
    }
  }
};
