
import { Toast } from '@ant-design/react-native';
import { Alert } from 'react-native';
import { dispatch } from '../plodux';


let isAlert = false;

function handleError( error ) {
  console.log(error);
  if ( !isAlert && error.state && error.state.code === 401 ) {
    isAlert = true;
    Alert.alert(
      '提示',
      '用户会话过期，请重新登陆！',
      [{ text: '知道了', onPress: () => {
        isAlert = false;
        dispatch({ type: 'global.logout' });
      }}],
      { cancelable: false },
    );
  } else if ( !isAlert ) {
    Toast.fail(( error.state && error.state.info ) || error.message, 3 );
  }
  // if ( !axios.isCancel( error )) {

  // }
}

export default handleError;
