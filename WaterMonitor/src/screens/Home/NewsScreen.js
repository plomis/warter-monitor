
import React from 'react';
import { NavigationEvents } from 'react-navigation';
import { SafeAreaView, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { connect } from '../../utils/plodux';


const basename = 'http://192.168.1.3/water/monitor/app';

function Screen({ navigation, dispatch }) {

  const handleWillFocus = () => {
    dispatch({
      type: 'statusBar.update',
      payload: {
        barStyle: 'dark-content'
      }
    });
  };

  const handleMessage = ( event ) => {
    try {
      const data = JSON.parse( event.nativeEvent.data );
      if ( Object.keys( data ).indexOf( 'url' ) !== -1 ) {
        navigation.navigate( 'NewsInfo', data );
      }
    } catch( err ) {
      console.log( err );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavigationEvents onWillFocus={handleWillFocus} />
      <WebView
        zoomable={false}
        source={{ uri: basename }}
        onMessage={handleMessage}
        dataDetectorTypes="none"
        // scrollEnabled={false}
        incognito
        hideKeyboardAccessoryView
        applicationNameForUserAgent="Thingspower/1.0.0"
        style={styles.webview} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  webview: {
    flex: 1,
    backgroundColor: '#F1F3FD'
  }
});

export default connect()( Screen );
