
import axios from 'axios';
import { Toast } from '@ant-design/react-native';


function handleError( error ) {
  if ( !axios.isCancel( error )) {
    console.log( 'Request Error', error );
    Toast.fail(( error.state && error.state.info ) || error.message, 3 );
  }
}

export default handleError;
