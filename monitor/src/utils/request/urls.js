
import { HOST } from '../../components/constants';

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
  head_get: '{admin}/public/head/get.do',
  user_info: '{admin}/{account}/public/user/info.do',
  mobile_update: '{admin}/{account}/public/mobile/update.do',
  mobile_vertify_code: '{admin}/{account}/public/update/vertify-code/send.do',
  changepwd_update: '{admin}/{account}/public/changepwd.do',

  // 页面
  meter_info: '{prefix}/meter/info.do',
  meter_list: '{prefix}/meter/list.do',
  meter_online: '{prefix}/meter/online/list.do',
  meter_history: '{prefix}/meter/realdata.do',
  warn_list: '{prefix}/warn/list.do',
  homepage_get: '{prefix}/homepage/get.do',
  meter_day: '{prefix}/meter/energy/use/day.do',
  meter_hour: '{prefix}/meter/energy/use/hour.do',
  meter_month: '{prefix}/meter/energy/use/month.do',
  rule_file: '{prefix}/rule/file/get.do'
};

export function getUrl( url ) {
  let string = urls[url];
  if ( string ) {
    Object.keys( tokens ).forEach(( token ) => {
      string = string.replace( `{${token}}`, tokens[token]);
    });
    return `${HOST}/${string}`;
  }
  return '';
}

export function addToken( token, value ) {
  tokens[token] = value;
}

export function delToken( token ) {
  delete tokens[token];
}
