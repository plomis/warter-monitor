
import React, { useState } from 'react';
import { NavigationEvents } from 'react-navigation';
import { View, StyleSheet, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { createStackNavigator, HeaderBackButton } from 'react-navigation-stack';
import { SegmentedControl, ActivityIndicator } from '@ant-design/react-native';
import WebView from 'react-native-webview';
import { HOST } from '../../components/constants';
import { connect } from '../../utils/plodux';


const basename = `${HOST}/water/monitor`;

const Segment = () => {
  return (
    <SegmentedControl
      underlayColor="transparent"
      style={styles.segment}
      // selectedIndex={isClear === '' ? 2 : isClear}
      values={[ '近一月', '近一年' ]}
      tintColor="#047FFE"
      onChange={( e ) => {

      }} />
  );
};

function BalanceInfo({ dispatch, navigation }) {

  const url = navigation.getParam( 'url' );
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

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={handleWillFocus} />
      <WebView
        zoomable={false}
        allowFileAccess
        scalesPageToFit
        javaScriptEnabled
        saveFormDataDisabled
        hideKeyboardAccessoryView
        allowsBackForwardNavigationGestures
        scrollEnabled={false}
        thirdPartyCookiesEnabled={false}
        overScrollMode="never"
        dataDetectorTypes="none"
        startInLoadingState={false}
        cacheEnabled={false}
        domStorageEnabled={false}
        allowsLinkPreview={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        applicationNameForUserAgent="Thingspower/1.0.0"
        source={{ uri: basename + url }}
        style={styles.webview}
        originWhitelist={['*']}
        onLoad={handleLoad} />
      {loading ? <ActivityIndicator toast text="正在加载" /> : null}
    </View>
  );
}

BalanceInfo.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: <Segment />,
    headerLeft: <HeaderBackButton onPress={() => navigation.navigate( 'Home' )} />
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  segment: {
    width: 180
  },
  webview: {
    flex: 1,
    backgroundColor: '#F1F3FD'
  }
});


const Info = createStackNavigator({
  BalanceInfoHome: {
    screen: connect()( BalanceInfo )
  }
}, {
  initialRouteName: 'BalanceInfoHome',
  headerLayoutPreset: 'center',
  defaultNavigationOptions: Platform.OS === 'ios' ? {} : {
    headerForceInset: { top: getStatusBarHeight() }
  }
});

export default Info;
