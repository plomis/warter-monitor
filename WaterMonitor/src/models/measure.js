
import moment from 'moment';
import handleError from '../utils/request/handleError';


function listFormat( item ) {
  return {
    title: item.meterName,
    dosage: item.lastMeterValue,
    unit: item.unit_zh,
    isDebug: item.isDebug,
    onLine: item.onLine,
    lastDataTime: item.lastDataTime,
    originalData: item
  };
}

export default {
  namespace: 'measure',
  state: {
    count: null,
    list: null,
    loading: false,
    infoLoading: false,
    listLoading: false,
    pageIndex: 1,
    pageSize: 30,
    pageLimit: 30,
    online: null,
    history: null,
    historyVar: null,
    info: null,
    'today': null,
    '30day': null,
    '12month': null
  },
  effects: {

    async getData({ request }, { put }) {


      let nextPayload = {};

      await put({
        type: 'update',
        payload: {
          loading: true
        }
      });

      try {

        const json = await request( 'meter_list' );

        nextPayload = {
          list: json.data.meter.map( listFormat ),
          count: json.data.count
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
    },

    async getInfo({ request, payload }, { put }) {

      let nextPayload = {};

      await put({
        type: 'update',
        payload: {
          infoLoading: true
        }
      });

      try {

        const json = await request( 'meter_info', { data: payload });

        await put({
          type: 'getChartData',
          request,
          payload: {
            meterId: payload.meterId
          }
        });

        nextPayload = {
          info: listFormat( json.data )
        };

      } catch( err ) {
        handleError( err );
      } finally {
        await put({
          type: 'update',
          payload: {
            ...nextPayload,
            infoLoading: false
          }
        });
      }
    },

    async getChartData({ request, payload }, { put }) {

      const [ day, hour, month ] = await [
        await request( 'meter_day', {
          data: {
            meterId: payload.meterId,
            beginDay: moment().add( -29, 'day' ).format( 'YYYY-MM-DD' ),
            endDay: moment().format( 'YYYY-MM-DD' )
          }
        }),
        await request( 'meter_hour', {
          data: {
            meterId: payload.meterId,
            beginDay: moment().format( 'YYYY-MM-DD' ),
            endDay: moment().format( 'YYYY-MM-DD' )
          }
        }),
        await request( 'meter_month', {
          data: {
            meterId: payload.meterId,
            beginMonth: moment().add( -11, 'month' ).format( 'YYYY-MM' ),
            endMonth: moment().format( 'YYYY-MM' )
          }
        })
      ];

      await put({
        type: 'update',
        payload: {
          'today': hour.data,
          '30day': day.data,
          '12month': month.data
        }
      });

    },

    async refreshOnline( action, { put }) {
      await put({
        ...action,
        isRefresh: true,
        type: 'getOnline',
      });
    },

    async getOnline({ request, payload, isRefresh }, { put, select }) {

      const { pageSize, pageLimit, online } = await select(({ measure }) => measure );

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

        const json = await request( 'meter_online', {
          data: payload
        });

        await put({
          type: 'update',
          payload: {
            online: isRefresh ? json.data : [ ...online, ...json.data ],
            pageIndex: payload.pageIndex,
            pageLimit: json.data.length
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

    },

    async refresHistory( action, { put }) {
      await put({
        ...action,
        isRefresh: true,
        type: 'getHistory',
      });
    },

    async getHistory({ request, payload, isRefresh }, { put, select }) {

      const { pageSize, pageLimit, history } = await select(({ measure }) => measure );
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

        const json = await request( 'meter_history', {
          data: payload
        });

        const datas = isRefresh ? json.data.dataList : [ ...history, ...json.data.dataList ];

        await put({
          type: 'update',
          payload: {
            history: datas,
            historyVar: datas && datas.length ? json.data.varList : null,
            pageIndex: json.data.pageInfo.pageIndex,
            pageLimit: json.data.dataList.length
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



//     async getOnline({ request, payload, callback }, { put, select }) {

//       try {console.log(payload);
//         // const response = await request( 'meter_online', {
//         //   data: payload
//         // });

//         const { online } = await select(({ measure }) => measure );
// // console.log(response);
//         callback( online );

//       } catch( err ) {
//         handleError( err );
//       }

//     }

  },
  reducers: {
    update( state, { payload }) {
      return { ...state, ...payload };
    }
  }
};
