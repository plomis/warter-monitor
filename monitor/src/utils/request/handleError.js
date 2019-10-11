
import { Toast } from '@ant-design/react-native';
import { Alert } from 'react-native';
import { dispatch } from '../plodux';


function handleError( error ) {

  if ( error.state && error.state.code === 401 ) {
    Alert.alert(
      '提示',
      '用户会话过期，请重新登陆！',
      [{ text: '知道了', onPress: () => dispatch( 'global.logout' )}],
      { cancelable: false },
    );
  } else {
    Toast.fail(( error.state && error.state.info ) || error.message, 3 );
  }
  // if ( !axios.isCancel( error )) {

  // }
}

export default handleError;
