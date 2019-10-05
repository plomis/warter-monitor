
import handleError from '../utils/request/handleError';


export default {
  namespace: 'user',
  state: {
    loading: false,
    info: null
  },
  effects: {

    async getInfo({ request }, { put }) {

      let nextPayload = {};

      await put({
        type: 'update',
        payload: {
          loading: true
        }
      });

      try {

        const json = await request( 'user_info' );

        nextPayload = {
          info: json.data
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
