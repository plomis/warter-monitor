
import axios from 'axios';
import { getUrl, addToken } from './urls';


function request( url, config ) {
  return axios( getUrl( url ), config ).then( response => {
    const json = response.data;
    if ( json.status['return'] !== 'false' ) {
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
