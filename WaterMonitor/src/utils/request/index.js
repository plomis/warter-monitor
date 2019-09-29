
import axios from 'axios';
import queryString from 'qs';
import { getUrl, addToken } from './urls';


function putToken( config ) {
  if ( !config.headers ) {
    config.headers = {};
  }
  config.headers['authorization'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBZG1pbl9Vc2VySWQiOjEsIkFkbWluX1VzZXJDb2RlIjoiVGhpbmdzIiwiQWRtaW5fVXNlck5hbWUiOiLlubPlj7DnrqHnkIblkZgiLCJBZG1pbl9VcGRhdGVLZXkiOiI2NEEyNTNCNi01Nzk5LTQxNjItODQ4QS04NTE5MTEyMDVCNTIifQ.7f5BWD03wnXvNilZCblvOjE0PiK0Eq3WZGzkP1ndwuQ';
  return config;
}

function getConfig( config ) {
  config.body = queryString.stringify( config.data );
  delete config.data;
  if ( config.body && ( !config.method || config.method === 'get' )) {
    config.method = 'POST';
  }
  if ( !config.headers ) {
    config.headers = {};
  }
  config.headers['content-type'] = 'application/json';
  return putToken( config );
}

function request( url, config ) {
  return fetch( getUrl( url ), getConfig( config ))
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
request.CancelToken = axios.CancelToken;
request.all = axios.all;

axios.defaults.timeout = 1000 * 30;

export default request;
