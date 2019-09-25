
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import Entry from './screens/Entry';
import { loadModel } from './utils/plodux';

// models
import themeModel from './models/theme';
import globelModel from './models/global';
import statusBarModel from './models/statusBar';
import measure from './models/measure';


loadModel( themeModel );
loadModel( globelModel );
loadModel( statusBarModel );
loadModel( measure );

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Entry />
  );
};

export default App;
