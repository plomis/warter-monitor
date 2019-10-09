
import { Platform } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-community/async-storage';
import { check, request, checkNotifications, requestNotifications, RESULTS, PERMISSIONS } from 'react-native-permissions';
import Sleep from '../utils/request/sleep';


const OS = PERMISSIONS[Platform.OS === 'ios' ? 'IOS' : 'ANDROID'];

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

      await Sleep( 2000 );

      // if ( Platform.OS === 'ios' ) {
      //   const result = await check( PERMISSIONS.IOS.CAMERA );
      //   if ( result === RESULTS.DENIED ) {
      //     await request( PERMISSIONS.IOS.CAMERA );
      //   }
      //   // check( PERMISSIONS.IOS.FACE_ID )
      // }

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
