
import React, { useRef, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { createAppContainer, SwitchActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';
import { Provider } from '@ant-design/react-native';
import withUpdate from '../../utils/withUpdate';
import { connect, subscribe } from '../../utils/plodux';
import Home from '../Home';
import Message from '../Message';
import MeasureInfo from '../Measure/Info';
import NewsInfo from '../News/Info';
import RuleInfo from '../Rule/Info';
import QrcodePage from '../Qrcode/Page';
import WebPage from '../WebPage';
import Scanner from '../Qrcode/Scanner';
import Password from '../Profile/Password';
import Contact from '../Profile/Contact';
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
  },
  Password: {
    screen: Password
  },
  Contact: {
    screen: Contact
  },
  Scanner: {
    screen: Scanner
  },
  QrcodePage: {
    screen: QrcodePage
  },
  WebPage: {
    screen: WebPage
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
    subscribe( 'global.logout', () => {
      ref.current.dispatch( SwitchActions.jumpTo({ routeName: 'Login' }));
    });
  }, []);

  useEffect(() => {
    if ( authed && accessToken ) {
      ref.current.dispatch( SwitchActions.jumpTo({ routeName: 'Stack' }));
    } else if ( authed ) {
      ref.current.dispatch( SwitchActions.jumpTo({ routeName: 'Login' }));
    }
  }, [ authed, accessToken ]);

  return (
    <Switcher ref={ref} {...props} />
  );
});


const App = ({ mode, barStyle }) => {
  return (
    <Provider>
      <StatusBar translucent animated barStyle={barStyle} backgroundColor="rgba(255,255,255,0)" />
      <Auth theme={mode} />
    </Provider>
  );
};

export default withUpdate( connect(({ statusBar, theme }) => {
  return {
    mode: theme.mode,
    barStyle: statusBar.barStyle
  };
})( App ));
