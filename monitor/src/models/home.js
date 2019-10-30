
import handleError from '../utils/request/handleError';


export default {
  namespace: 'home',
  state: {
    loading: false,
    data: null
  },
  effects: {

    async getData({ request, isRefresh }, { put }) {

      let nextPayload = {};

      if ( isRefresh ) {
        await put({
          type: 'update',
          payload: {
            loading: true
          }
        });
      }

      try {

        const json = await request( 'homepage_get' );
        nextPayload = {
          data: json.data
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
