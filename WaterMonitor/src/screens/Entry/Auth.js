
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from '../../utils/plodux';


function Auth({ navigation, accessToken, authed }) {

  useEffect(() => {
    if ( authed && accessToken ) {
      navigation.navigate( 'Stack' );
    } else if ( authed ) {
      navigation.navigate( 'Login' );
    }
  }, [accessToken, authed]);

  return (
    <View style={styles.auth}>
    </View>
  );
}

const styles = StyleSheet.create({
  auth: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  authText: {
    fontSize: 14
  }
});

export default connect(({ global }) => {
  return {
    authed: global.authed,
    accessToken: global.accessToken
  };
})( Auth );
