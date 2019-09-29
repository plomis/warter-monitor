
import React from 'react';
import { StatusBar } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';
import { Provider } from '@ant-design/react-native';
import { connect } from '../../utils/plodux';
import Home from '../Home';
import Message from '../Message';
import MeasureInfo from '../Measure/Info';
import NewsInfo from '../News/Info';
import Login from '../Login';
import Auth from './Auth';


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
  }
}, {
  initialRouteName: 'Home',
  headerMode: 'none'
});

const Switcher = createAppContainer(
  createAnimatedSwitchNavigator({
    Auth,
    Login,
    Stack
  }, {
    initialRouteName: 'Auth',
    backBehavior: 'none',
    transition: (
      <Transition.Together>
        <Transition.Out
          type="slide-left"
          durationMs={200}
          interpolation="easeIn" />
        <Transition.In type="fade" durationMs={200} />
      </Transition.Together>
    ),
  })
);

const App = ({ mode, barStyle, accessToken }) => {
  return (
    <Provider>
      <StatusBar barStyle={barStyle} />
      <Switcher theme={mode} />
    </Provider>
  );
};

export default connect(({ global, statusBar, theme }) => {
  return {
    mode: theme.mode,
    barStyle: statusBar.barStyle,
    accessToken: global.accessToken
  };
})( App );
