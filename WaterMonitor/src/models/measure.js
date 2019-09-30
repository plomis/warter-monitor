
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
    online: [],
    info: null
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

        // await put({
        //   type: 'getChartData',
        //   payload: {
        //     meterId: payload.meterId
        //   }
        // });

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

    async getChartData({ request, payload }, { put, select }) {

      // const json = request.all(
      //   await request( 'meter_day', {
      //     data: {
      //       meterId: payload.meterId,
      //       beginDay: moment().add( -29, 'day' ).format( 'YYYY-MM-DD' ),
      //       endDay: moment().format( 'YYYY-MM-DD' )
      //     }
      //   }),
      //   await request( 'meter_hour', {
      //     data: {
      //       meterId: payload.meterId,
      //       beginDay: moment().add( -29, 'day' ).format( 'YYYY-MM-DD' ),
      //       endDay: moment().format( 'YYYY-MM-DD' )
      //     }
      //   }),
      //   await request( 'meter_month', { data: payload }),
    },

    async getOnline({ request, payload, callback }, { put, select }) {

      try {console.log(payload);
        // const response = await request( 'meter_online', {
        //   data: payload
        // });

        const { online } = await select(({ measure }) => measure );
// console.log(response);
        callback( online );

      } catch( err ) {
        handleError( err );
      }

    }

  },
  reducers: {
    update( state, { payload }) {
      return { ...state, ...payload };
    }
  }
};
