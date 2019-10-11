
import handleError from '../utils/request/handleError';


export default {
  namespace: 'user',
  state: {
    counter: null,
    restSeconds: 0,
    loading: false,
    info: null
  },
  effects: {

    async getVertifyCode({ request, payload }, { put }) {

      try {
        await request( 'mobile_vertify_code', { data: payload });

        await put({
          type: 'update',
          payload: {
            restSeconds: 60,
            counter: setInterval(() => {
              put({ type: 'decrease' });
            }, 1000 )
          }
        });

      } catch( err ) {
        handleError( err );
      }
    },

    async updateMobile({ request, payload, callback }, { put }) {

      await put({
        type: 'update',
        payload: {
          loading: true
        }
      });

      try {

        await request( 'mobile_update', {
          data: payload
        });

        callback();

      } catch( err ) {
        handleError( err );
      } finally {

        await put({
          type: 'update',
          payload: {
            loading: false
          }
        });
      }
    },

    async updatePassword({ request, payload, callback }, { put }) {

      await put({
        type: 'update',
        payload: {
          loading: true
        }
      });

      try {

        await request( 'changepwd_update', {
          data: payload
        });

        callback();

      } catch( err ) {
        handleError( err );
      } finally {

        await put({
          type: 'update',
          payload: {
            loading: false
          }
        });
      }
    },

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
    },

    decrease( state ) {
      if ( state.restSeconds > 0 ) {
        return { ...state, restSeconds: state.restSeconds - 1 };
      } else if ( state.counter ) {
        clearInterval( state.counter );
        return { ...state, counter: null };
      }
      return state;
    }
  }
};
