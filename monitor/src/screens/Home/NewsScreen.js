
import React, { useRef, useContext } from 'react';
import { Icon, ActionSheet } from '@ant-design/react-native';
import { NavigationEvents, ThemeContext } from 'react-navigation';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import WebView from 'react-native-webview';
import { HEADER_HEIGHT, ThemeConstants, HOST, ACTIVE_OPACITY } from '../../components/constants';
import { connect } from '../../utils/plodux';


const basename = `${HOST}/water/monitor/app`;

function Screen({ navigation, dispatch }) {

  const theme = useContext( ThemeContext );
  const statusBarHeight = getStatusBarHeight();
  const webviewRef = useRef( null );

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

  const handleShowActionSheet = () => {
    ActionSheet.showActionSheetWithOptions({
      options: [ '刷新', '取消' ],
      cancelButtonIndex: 1
    }, ( buttonIndex ) => {
      if ( buttonIndex === 0 ) {
        webviewRef.current.reload();
      }
    });
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
        <View style={{ width: 40, marginLeft: 16 }} />
        <Text style={styles.titleText}>文化宣传</Text>
        <TouchableOpacity activeOpacity={ACTIVE_OPACITY} onPress={handleShowActionSheet}>
          <Icon name="ellipsis" size={32} color="#047FFE" style={{ marginRight: 16, textAlign: 'right', width: 40 }} />
        </TouchableOpacity>
      </View>
      <WebView
        ref={webviewRef}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default connect()( Screen );
