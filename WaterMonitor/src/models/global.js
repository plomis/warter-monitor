
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-community/async-storage';


export default {
  namespace: 'global',
  state: {
    authed: false,
    accessToken: ''
  },
  effects: {

    async loaded( _, { put }) {
      const accessToken = await AsyncStorage.getItem( 'accessToken' );
      await put({ type: 'update', payload: { accessToken, authed: true }});
      SplashScreen.hide();
    },

    async logout( _, { put }) {
      await AsyncStorage.removeItem( 'accessToken' );
      await put({ type: 'update', payload: { accessToken: '' }});
    }
  },
  reducers: {
    update( state, { payload }) {
      return { ...state, ...payload };
    }
  }
};
