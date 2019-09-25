
import axios from 'axios';
import { Toast } from '@ant-design/react-native';


function handleError( error ) {
  if ( !axios.isCancel( error )) {
    console.log( 'Request Error', error );
    Toast.offline( error.message );
  }
}

export default handleError;
