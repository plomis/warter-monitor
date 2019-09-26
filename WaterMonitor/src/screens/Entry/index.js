
import React from 'react';
import { StatusBar } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Provider } from '@ant-design/react-native';
import { connect } from '../../utils/plodux';
import Home from '../Home';
import Message from '../Message';
import Measure from '../Measure';
import News from '../News';


const Routes = createStackNavigator({
  Home: {
    screen: Home
  },
  Message: {
    screen: Message
  },
  MeasureInfo: {
    screen: Measure
  },
  NewsInfo: {
    screen: News
  }
}, {
  headerMode: 'none'
});

const Stack = createAppContainer( Routes );

const App = ({ mode, barStyle }) => {
  return (
    <Provider>
      <StatusBar barStyle={barStyle} />
      <Stack theme={mode} />
    </Provider>
  );
};

export default connect(({ statusBar, theme }) => {
  return {
    mode: theme.mode,
    barStyle: statusBar.barStyle
  };
})( App );
