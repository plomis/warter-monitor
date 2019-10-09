
import React, { useRef, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { createAppContainer, SwitchActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';
import { Provider } from '@ant-design/react-native';
import { connect } from '../../utils/plodux';
import Home from '../Home';
import Message from '../Message';
import MeasureInfo from '../Measure/Info';
import NewsInfo from '../News/Info';
import RuleInfo from '../Rule/Info';
import Login from '../Login';
import Authing from './Authing';


const Stack = createStackNavigator({
  Home: {
    screen: Home
  },
  Message: {
    screen: Message
  },
  MeasureInfo: {
    screen: MeasureInfo
  },
  NewsInfo: {
    screen: NewsInfo
  },
  RuleInfo: {
    screen: RuleInfo
  }
}, {
  initialRouteName: 'Home',
  headerMode: 'none'
});

const Switcher = createAppContainer(
  createAnimatedSwitchNavigator({
    Authing,
    Login,
    Stack
  }, {
    initialRouteName: 'Authing',
    backBehavior: 'none',
    transition: (
      <Transition.Together>
        <Transition.Out
          type="slide-left"
          durationMs={200}
          interpolation="easeOut" />
        <Transition.In type="slide-right" interpolation="easeOut" durationMs={200} />
      </Transition.Together>
    ),
  })
);


const Auth = connect(({ global }) => {
  return {
    authed: global.authed,
    accessToken: global.accessToken
  };
})( function({ authed, accessToken, ...props }) {
  const ref = useRef( null );
  useEffect(() => {
    if ( authed && accessToken ) {
      ref.current.dispatch( SwitchActions.jumpTo({ routeName: 'Stack' }))
    } else if ( authed ) {
      ref.current.dispatch( SwitchActions.jumpTo({ routeName: 'Login' }))
    }
  }, [ authed, accessToken ]);
  return (
    <Switcher ref={ref} {...props} />
  );
});


const App = ({ mode, barStyle }) => {
  return (
    <Provider>
      <StatusBar translucent barStyle={barStyle} backgroundColor="rgba(0, 0, 0, 0)"/>
      <Auth theme={mode} />
    </Provider>
  );
};

export default connect(({ statusBar, theme }) => {
  return {
    mode: theme.mode,
    barStyle: statusBar.barStyle
  };
})( App );
