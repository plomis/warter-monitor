
// import axios from 'axios';
import queryString from 'qs';
import AsyncStorage from '@react-native-community/async-storage';
import { getUrl, addToken } from './urls';


const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

function putToken( config, accessToken ) {
  if ( !config.headers ) {
    config.headers = {};
  }
  if ( accessToken ) {
    config.headers['authorization'] = accessToken;
  }
  return config;
}

function getConfig( config, accessToken ) {
  config.body = queryString.stringify( config.data );
  delete config.data;
  if ( config.body && ( !config.method || config.method === 'get' )) {
    config.method = 'POST';
  }
  if ( !config.headers ) {
    config.headers = {};
  }
  config.headers['content-type'] = 'application/json';
  return putToken( config, accessToken );
}

async function request( url, config ) {
  const accessToken = await AsyncStorage.getItem( 'accessToken' );
  return fetch( getUrl( url ), getConfig( config, accessToken ))
    .then( response => {
      if ( response.status >= 200 && response.status < 300 ) {
        return response;
      }
      throw response.state ? response : {
        state: {
          code: response.status,
          info: codeMessage[response.status] || response.statusText || `发生错误(${response.status})`
        }
      }
    })
    .then( response => response.json())
    .then( json => {
      if ( json.state['return'] !== 'false' ) {
        return json;
      }
      throw json;
    }).catch(( err ) => {
      throw err;
    });
}

request.addToken = addToken;
// request.CancelToken = axios.CancelToken;

// axios.defaults.timeout = 1000 * 30;

export default request;
