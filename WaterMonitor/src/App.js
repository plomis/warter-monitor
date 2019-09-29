
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { LocaleConfig } from 'react-native-calendars';
import Entry from './screens/Entry';
import { loadModel } from './utils/plodux';


LocaleConfig.locales['zh'] = {
  monthNames: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
  monthNamesShort: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
  dayNames: ['周日','周一','周二','周三','周四','周五','周六'],
  dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
  today: '今天'
};

LocaleConfig.defaultLocale = 'zh';


// models
import themeModel from './models/theme';
import globelModel from './models/global';
import statusBarModel from './models/statusBar';
import measure from './models/measure';
import message from './models/message';
import login from './models/login';


loadModel( themeModel );
loadModel( globelModel );
loadModel( statusBarModel );
loadModel( measure );
loadModel( message );
loadModel( login );

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Entry />
  );
};

export default App;
