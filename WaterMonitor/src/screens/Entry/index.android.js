
import React, { Fragment, useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import Home from '../Home';
// import AntdTabs from '../AntdTabs';

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

const App = () => {

  return (
    <Fragment>
      <StatusBar animated barStyle="dark-content" />
      <Home />
    </Fragment>
  );
};

// const styles = StyleSheet.create({

// });

export default App;
