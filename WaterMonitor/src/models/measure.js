
import handleError from '../utils/request/handleError';


export default {
  namespace: 'measure',
  state: {
    online: [
      {
        "day": "2019-08-22",
        "onLineRate": 0.9999
      },
      {
        "day": "2019-08-23",
        "onLineRate": 1
      },
      {
        "day": "2019-08-24",
        "onLineRate": 1
      },
      {
        "day": "2019-08-25",
        "onLineRate": 1
      },
      {
        "day": "2019-08-26",
        "onLineRate": 1
      },
      {
        "day": "2019-08-27",
        "onLineRate": 1
      },
      {
        "day": "2019-08-28",
        "onLineRate": 1
      },
      {
        "day": "2019-08-29",
        "onLineRate": 1
      },
      {
        "day": "2019-08-30",
        "onLineRate": 1
      },
      {
        "day": "2019-08-31",
        "onLineRate": 1
      },
      {
        "day": "2019-09-01",
        "onLineRate": 1
      },
      {
        "day": "2019-09-02",
        "onLineRate": 1
      },
      {
        "day": "2019-09-03",
        "onLineRate": 1
      },
      {
        "day": "2019-09-04",
        "onLineRate": 1
      },
      {
        "day": "2019-09-05",
        "onLineRate": 1
      },
      {
        "day": "2019-09-06",
        "onLineRate": 1
      },
      {
        "day": "2019-09-07",
        "onLineRate": 1
      },
      {
        "day": "2019-09-08",
        "onLineRate": 1
      },
      {
        "day": "2019-09-09",
        "onLineRate": 1
      },
      {
        "day": "2019-09-10",
        "onLineRate": 1
      },
      {
        "day": "2019-09-11",
        "onLineRate": 1
      },
      {
        "day": "2019-09-12",
        "onLineRate": 1
      },
      {
        "day": "2019-09-13",
        "onLineRate": 1
      },
      {
        "day": "2019-09-14",
        "onLineRate": 1
      },
      {
        "day": "2019-09-15",
        "onLineRate": 1
      },
      {
        "day": "2019-09-16",
        "onLineRate": 1
      },
      {
        "day": "2019-09-17",
        "onLineRate": 1
      },
      {
        "day": "2019-09-18",
        "onLineRate": 0.8
      },
      {
        "day": "2019-09-19",
        "onLineRate": 1
      },
      {
        "day": "2019-09-20",
        "onLineRate": 1
      },
      {
        "day": "2019-09-21",
        "onLineRate": 1
      },
      {
        "day": "2019-09-22",
        "onLineRate": 1
      },
      {
        "day": "2019-09-23",
        "onLineRate": 1
      },
      {
        "day": "2019-09-24",
        "onLineRate": 1
      },
      {
        "day": "2019-09-25",
        "onLineRate": 1
      }
    ]
  },
  effects: {

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
      return { ...state, barStyle: payload.barStyle };
    }
  }
};
