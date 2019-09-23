
import React, { Fragment } from 'react';
import { StatusBar } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { connect } from '../../utils/plodux';
import Home from '../Home';
import Message from '../Message';
import Measure from '../Measure';


const Routes = createStackNavigator({
  Home: {
    screen: Home
  },
  Message: {
    screen: Message
  },
  MeasureInfo: {
    screen: Measure
  }
}, {
  headerMode: 'none'
});

const Stack = createAppContainer( Routes );

const App = ({ mode, barStyle }) => {
  return (
    <Fragment>
      <StatusBar barStyle={barStyle} />
      <Stack theme={mode} />
    </Fragment>
  );
};

export default connect(({ statusBar, theme }) => {
  return {
    mode: theme.mode,
    barStyle: statusBar.barStyle
  };
})( App );
