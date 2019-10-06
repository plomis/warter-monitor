
import moment from 'moment';
import React, { useEffect } from 'react';
import { LocaleConfig } from 'react-native-calendars';
import 'moment/locale/zh-cn';
import { loadModel, connect } from './utils/plodux';
import Entry from './screens/Entry';


// // 全局设置 locale
moment.locale( 'zh-cn' );

LocaleConfig.locales['zh'] = {
  monthNames: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
  monthNamesShort: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
  dayNames: ['周日','周一','周二','周三','周四','周五','周六'],
  dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
  today: '今天'
};

LocaleConfig.defaultLocale = 'zh';


// models
import theme from './models/theme';
import global from './models/global';
import statusBar from './models/statusBar';
import measure from './models/measure';
import message from './models/message';
import login from './models/login';
import home from './models/home';
import user from './models/user';


loadModel( theme );
loadModel( global );
loadModel( statusBar );
loadModel( measure );
loadModel( message );
loadModel( login );
loadModel( home );
loadModel( user );


const App = ({ dispatch }) => {

  useEffect(() => {
    dispatch({ type: 'global.loaded' });
  }, []);

  return (
    <Entry />
  );
};

export default connect()( App );
