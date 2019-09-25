

const host = 'http://192.168.1.3/'
const tokens = {
  prefix: 'app'
};
const urls = {
  meter_online: '{prefix}/meter/online/list.do' //;sessionid={session}
};

export function getUrl( url ) {
  let string = urls[url];
  if ( string ) {
    Object.keys( tokens ).forEach(( token ) => {
      string = string.replace( `{${token}}`, tokens[token]);
    });
    return host + string;
  }
  return '';
}

export function addToken( token, value ) {
  tokens[token] = value;
}

export function delToken( token ) {
  delete tokens[token];
}
