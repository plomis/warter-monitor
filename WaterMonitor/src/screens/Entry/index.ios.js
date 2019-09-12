
import React, { Fragment } from 'react';
import { StatusBar } from 'react-native';
import Home from '../Home';
import { connect } from '../../utils/plodux';


const App = ({ mode, barStyle }) => {
  return (
    <Fragment>
      <StatusBar animated barStyle={barStyle} />
      <Home theme={mode} />
    </Fragment>
  );
};

export default connect(({ statusBar, theme }) => {
  return {
    mode: theme.mode,
    barStyle: statusBar.barStyle
  };
})( App );
