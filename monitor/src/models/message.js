
import moment from 'moment';
import handleError from '../utils/request/handleError';


function append( list, newList ) {
  newList.forEach(( data ) => {
    const today = moment().format( 'YYYY-MM-DD' );
    const yestoday = moment().add( -1, 'day' ).format( 'YYYY-MM-DD' );
    const sectionKey = moment( data.warnDateTime ).format( 'YYYY-MM-DD' );
    let section = list.find(({ key }) => key === sectionKey );
    if ( !section ) {
      section = {
        key: sectionKey,
        title: today === sectionKey ? '今天' : yestoday === sectionKey ? '昨天' : sectionKey,
        data: []
      };
      list.push( section );
    }
    section.data.push( data );
  });
  return list;
}

export default {
  namespace: 'message',
  state: {
    loading: false,
    listLoading: false,
    list: null,
    isClear: 0,
    pageIndex: 1,
    pageSize: 30,
    pageLimit: 30,
    firstLoad: true
  },
  effects: {

    async refresh( action, { put }) {
      await put({
        ...action,
        isRefresh: true,
        type: 'getList',
      });
    },

    async getList({ request, payload, isFirstLoad, isRefresh }, { put, select }) {

      let nextPayload = {};

      try {

        const { pageSize, pageLimit, list } = await select(({ message }) => message );
        if ( !isRefresh && !isFirstLoad && pageSize > pageLimit ) {
          return;
        }

        await put({
          type: 'update',
          payload: {
            loading: true,
            list: isFirstLoad ? null : list
          }
        });

        const json = await request( 'warn_list', {
          data: payload
        });

        nextPayload = {
          list: append( isFirstLoad || isRefresh || !list ? [] : [...list], json.data.list ),
          pageIndex: json.data.pageInfo.pageIndex,
          pageLimit: json.data.list.length
        };

      } catch( err ) {
        handleError( err );
      } finally {

        await put({
          type: 'update',
          payload: {
            ...nextPayload,
            loading: false
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
