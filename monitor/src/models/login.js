
import AsyncStorage from '@react-native-community/async-storage';
import handleError from '../utils/request/handleError';


export default {
  namespace: 'login',
  state: {
    loading: false,
    counter: null,
    restSeconds: 0,
    mode: ''
  },
  effects: {

    async getVertifyCode({ request, payload }, { put }) {

      await put({
        type: 'update',
        payload: {
          restSeconds: 60,
          counter: setInterval(() => {
            put({ type: 'decrease' });
          }, 1000 )
        }
      });

      try {
        await request( 'vertify_code', { data: payload });
      } catch( err ) {
        handleError( err );
      }
    },

    async login({ request, payload, mode, callback }, { put }) {

      await put({
        type: 'update',
        payload: {
          loading: true
        }
      });

      try {

        const json = await request( mode === 'userName' ? 'login' : 'phone_login', {
          data: payload
        });

        await AsyncStorage.setItem( 'accessToken', json.data.accessToken );
        await AsyncStorage.setItem( 'userCode', json.data.userCode );
        await AsyncStorage.setItem( 'userName', json.data.userName );

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
