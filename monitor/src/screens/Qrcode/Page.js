
import qs from 'qs';
import React, { useState } from 'react';
import { NavigationEvents } from 'react-navigation';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Icon, ActivityIndicator, ActionSheet } from '@ant-design/react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { createStackNavigator, HeaderBackButton } from 'react-navigation-stack';
import WebView from 'react-native-webview';
import { ACTIVE_OPACITY } from '../../components/constants';
import { connect } from '../../utils/plodux';



function ReportHome({ dispatch, navigation, accessToken, info, userLoading }) {

  const url = navigation.getParam( 'url' ) + qs.stringify({
    userName: info.userName,
    mobileNo: info.mobileNo,
    token: accessToken
  }, { addQueryPrefix: true });

  const [ loading, setLoading ] = useState( true );

  const handleWillFocus = () => {
    dispatch({
      type: 'statusBar.update',
      payload: {
        barStyle: 'dark-content'
      }
    });
  };

  const handleLoad = () => {
    setLoading( false );
  };

  const handleMessage = ( event ) => {
    try {
      const data = JSON.parse( event.nativeEvent.data );
      if ( Object.keys( data ).indexOf( 'url' ) !== -1 ) {
        navigation.navigate( 'WebPage', { ...data, back: 'QrcodePage' } );
      }
    } catch( err ) {
      console.log( err );
    }
  };

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={handleWillFocus} />
      {!userLoading ? (
        <WebView
          zoomable={false}
          onLoad={handleLoad}
          source={{ uri: url }}
          style={styles.webview}
          onMessage={handleMessage}
          dataDetectorTypes="none"
          hideKeyboardAccessoryView
          applicationNameForUserAgent="Thingspower/1.0.0" />
      ) : <View style={styles.webview} />}
      {userLoading || loading ? <ActivityIndicator toast text="正在加载" /> : null}
    </View>
  );
}

ReportHome.navigationOptions = ({ navigation }) => {

  const title = navigation.getParam( 'title' );

  const handleShowActionSheet = () => {
    ActionSheet.showActionSheetWithOptions({
      options: [ '刷新', '取消' ],
      cancelButtonIndex: 1
    }, ( buttonIndex ) => {
      if ( buttonIndex === 0 ) {
        // webviewRef.current.reload();
      }
    });
  };

  return {
    title,
    headerRight: (
      <TouchableOpacity activeOpacity={ACTIVE_OPACITY} onPress={handleShowActionSheet}>
        <Icon name="ellipsis" size={20} color="#047FFE" style={{ marginRight: 16 }} />
      </TouchableOpacity>
    ),
    headerLeft: <HeaderBackButton onPress={() => navigation.navigate( 'Home' )} />
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  webview: {
    flex: 1,
    backgroundColor: '#F1F3FD'
  }
});


const Report = createStackNavigator({
  ReportHome: {
    screen: connect(({ global, user }) => {
      return {
        accessToken: global.accessToken,
        userLoading: user.loading,
        info: user.info,
      }
    })( ReportHome )
  }
}, {
  initialRouteName: 'ReportHome',
  headerLayoutPreset: 'center',
  defaultNavigationOptions: Platform.OS === 'ios' ? {} : {
    headerForceInset: { top: getStatusBarHeight() }
  }
});


export default Report;
