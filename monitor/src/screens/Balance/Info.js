
import moment from 'moment';
import React, { useState } from 'react';
import { NavigationEvents } from 'react-navigation';
import { View, StyleSheet, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { createStackNavigator, HeaderBackButton } from 'react-navigation-stack';
import { SegmentedControl, ActivityIndicator } from '@ant-design/react-native';
import WebView from 'react-native-webview';
import { HOST } from '../../components/constants';
import { connect } from '../../utils/plodux';


const basename = `${HOST}/water/monitor/app`;

const Segment = connect()(({ dispatch }) => {
  return (
    <SegmentedControl
      underlayColor="transparent"
      style={styles.segment}
      values={[ '近一月', '近一年' ]}
      tintColor="#047FFE"
      onChange={( e ) => {
        dispatch({
          type: 'balance.update',
          payload: {
            beginDate: e.nativeEvent.selectedSegmentIndex === 0 ? moment().add( -29, 'day' ).format( 'YYYY-MM-DD' ) : moment().add( -11, 'month' ).format( 'YYYY-MM-DD' ),
            endDate: moment().format( 'YYYY-MM-DD' )
          }
        });
      }} />
  );
});

function BalanceInfo({ dispatch, navigation, accessToken, beginDate, endDate }) {

  const balanceId = navigation.getParam( 'id' );
  const [ loading, setLoading ] = useState( true );
  const url = `/balance?balanceId=${balanceId}&beginDate=${beginDate}&endDate=${endDate}&token=${accessToken}`;

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
    screen: connect(({ global, balance }) => {
      return {
        beginDate: balance.beginDate,
        endDate: balance.endDate,
        accessToken: global.accessToken
      }
    })( BalanceInfo )
  }
}, {
  initialRouteName: 'BalanceInfoHome',
  headerLayoutPreset: 'center',
  defaultNavigationOptions: Platform.OS === 'ios' ? {} : {
    headerForceInset: { top: getStatusBarHeight() }
  }
});

export default Info;
