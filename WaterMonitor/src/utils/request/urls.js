

const host = 'http://218.90.26.31:8082/'; // 'http://192.168.1.3/'
const tokens = {
  prefix: 'water/do/monitor/1/app',
  account: 'v1',
  admin: 'water/do/admin'
};
const urls = {

  // 登录
  login: '{admin}/{account}/login/user/login.do',
  phone_login: '{admin}/{account}/login/user/mobile/login.do',
  vertify_code: '{admin}/public/login/vertify-code/send.do',

  // 用户
  user_info: '{admin}/{account}/public/user/info.do',
  head_get: '{admin}/public/head/get.do',

  // 页面
  meter_info: '{prefix}/meter/info.do',
  meter_list: '{prefix}/meter/list.do',
  meter_online: '{prefix}/meter/online/list.do',
  meter_history: '{prefix}/meter/realdata.do',
  warn_list: '{prefix}/warn/list.do',
  homepage_get: '{prefix}/homepage/get.do',
  meter_day: '{prefix}/meter/energy/use/day.do',
  meter_hour: '{prefix}/meter/energy/use/hour.do',
  meter_month: '{prefix}/meter/energy/use/month.do'
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
