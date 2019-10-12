
import { Platform } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-community/async-storage';
import { check, request, checkNotifications, requestNotifications, RESULTS, PERMISSIONS } from 'react-native-permissions';
import Sleep from '../utils/request/sleep';


export default {
  namespace: 'global',
  state: {
    authed: false,
    accessToken: ''
  },
  effects: {

    async loaded( action, { put }) {

      try {
        const accessToken = await AsyncStorage.getItem( 'accessToken' );
        await put({ type: 'update', payload: { accessToken, authed: true }});
        if ( accessToken ) {
          await put({ type: 'user.getInfo', request: action.request });
        }
        SplashScreen.hide();

        await Sleep( 2000 );

        if ( Platform.OS === 'android' ) {
          const result = await check( PERMISSIONS.ANDROID.CAMERA );
          if ( result === RESULTS.DENIED ) {
            await request( PERMISSIONS.ANDROID.CAMERA );
          }
        }

        const notificationsResult = await checkNotifications();
        if ( notificationsResult.status === RESULTS.DENIED ) {
          await requestNotifications([ 'alert', 'badge', 'sound', 'criticalAlert', 'provisional' ]);
        }

      } catch( err ) {
        console.log( err );
      }
    },

    logout( _, { put }) {
      AsyncStorage.removeItem( 'accessToken' );
      put({ type: 'update', payload: { accessToken: '' }});
    }
  },
  reducers: {
    update( state, { payload }) {
      return { ...state, ...payload };
    }
  }
};
