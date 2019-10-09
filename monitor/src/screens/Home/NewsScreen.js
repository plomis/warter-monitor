
import React, { useContext } from 'react';
import { NavigationEvents, ThemeContext } from 'react-navigation';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Text, View, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { HEADER_HEIGHT, ThemeConstants, HOST } from '../../components/constants';
import { connect } from '../../utils/plodux';


const basename = `${HOST}/water/monitor/app`;

function Screen({ navigation, dispatch }) {

  const theme = useContext( ThemeContext );
  const statusBarHeight = getStatusBarHeight();

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
    <View style={styles.container}>
      <NavigationEvents onWillFocus={handleWillFocus} />
      <View style={[ styles.title, {
        paddingTop: statusBarHeight,
        height: statusBarHeight + HEADER_HEIGHT,
        backgroundColor: ThemeConstants[theme].backgroundColor,
        borderBottomColor: ThemeConstants[theme].borderTopColor,
        borderBottomWidth: 1
      }]}>
        <Text style={styles.titleText}>文化宣传</Text>
      </View>
      <WebView
        zoomable={false}
        source={{ uri: basename }}
        onMessage={handleMessage}
        dataDetectorTypes="none"
        incognito
        hideKeyboardAccessoryView
        applicationNameForUserAgent="Thingspower/1.0.0"
        style={styles.webview} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  webview: {
    flex: 1,
    backgroundColor: '#F1F3FD'
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default connect()( Screen );
