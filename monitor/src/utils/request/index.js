
// import axios from 'axios';
import queryString from 'qs';
import AsyncStorage from '@react-native-community/async-storage';
import { getUrl, addToken } from './urls';


function putToken( config, accessToken ) {
  if ( !config.headers ) {
    config.headers = {};
  }
  config.headers['authorization'] = accessToken; //'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBZG1pbl9Vc2VySWQiOjEsIkFkbWluX1VwZGF0ZUtleSI6IjY0QTI1M0I2NTc5OTQxNjI4NDhBODUxOTExMjA1QjUyIn0.wDmZdde-R5R5zAoYTMXWeJ-r_qnmADNmZXxX_2U71tY';
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
