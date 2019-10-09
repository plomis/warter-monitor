
import { StatusBar } from 'react-native';

export default {
  namespace: 'statusBar',
  state: {
    barStyle: 'dark-content', // light-content
  },
  effects: {
    // async setMode({ payload }, { put }) {
    //   put({

    //   })
    // }
  },
  reducers: {

    // 不需要渲染
    setBarStyle( state, { payload }) {
      StatusBar.setBarStyle( payload.barStyle, payload.animated );
      state.barStyle = payload.barStyle;
      return state;
    },

    update( state, { payload }) {
      return { ...state, barStyle: payload.barStyle };
    }

    // toggle( state ) {
    //   if ( state.barStyle === 'light-content' ) {
    //     StatusBar.setBarStyle( 'dark-content', true );
    //     return Object.assign( state, { barStyle: 'dark-content' });
    //   } else {
    //     StatusBar.setBarStyle( 'light-content', true );
    //     return Object.assign( state, { barStyle: 'light-content' });
    //   }
    // }
  }
};
