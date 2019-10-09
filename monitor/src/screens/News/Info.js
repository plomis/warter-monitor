
import React from 'react';
import { NavigationEvents } from 'react-navigation';
import { View, StyleSheet, TouchableOpacity, Platform, Share } from 'react-native';
import { Icon, ActionSheet } from '@ant-design/react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { createStackNavigator, HeaderBackButton } from 'react-navigation-stack';
import WebView from 'react-native-webview';
import { ACTIVE_OPACITY } from '../../components/constants';
import { connect } from '../../utils/plodux';


const basename = 'http://218.90.26.31:8082/water/monitor/app';

function NewsInfo({ dispatch, navigation }) {

  const url = navigation.getParam( 'url' );

  const handleWillFocus = () => {
    dispatch({
      type: 'statusBar.update',
      payload: {
        barStyle: 'dark-content'
      }
    });
  };


  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={handleWillFocus} />
      <WebView
        zoomable={false}
        source={{ uri: basename + url }}
        style={styles.webview}
        dataDetectorTypes="none"
        incognito
        hideKeyboardAccessoryView
        applicationNameForUserAgent="Thingspower/1.0.0" />
    </View>
  );
}

NewsInfo.navigationOptions = ({ navigation }) => {
  const title = navigation.getParam( 'title' );

  const handleShowShareActionSheet = async () => {

    const result = await Share.share({
      message:
        'React Native | A framework for building native apps using React',
    });

    console.log(result);


    // const opts = {
    //   message: 'Message to go with the shared url',
    //   title: 'Share Actionsheet',
    // };
    // if ( Platform.OS === 'ios' ) {
    //   opts.url = 'https://www.alipay.com/';
    //   opts.tintColor = '#ff0000';
    //   opts.excludedActivityTypes = ['com.apple.UIKit.activity.PostToTwitter'];
    // }
    // ActionSheet.showShareActionSheetWithOptions(
    //   opts,
    //   error => alert( error ),
    //   ( success, method ) => {
    //     if ( success ) {
    //       text = `Shared with ${method}`;
    //     } else {
    //       text = 'Did not share';
    //     }
    //   }
    // );
  };

  return {
    title,
    headerRight: (
      <TouchableOpacity activeOpacity={ACTIVE_OPACITY} onPress={handleShowShareActionSheet}>
        <Icon name="share-alt" size={20} color="#047FFE" style={{ marginRight: 16 }} />
      </TouchableOpacity>
    ),
    headerLeft: <HeaderBackButton onPress={() => navigation.navigate( 'News' )} />
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


const Info = createStackNavigator({
  NewsInfoHome: {
    screen: connect()( NewsInfo ),
    navigationOptions: {
      headerForceInset: { top: getStatusBarHeight() }
    }
  }
}, {
  initialRouteName: 'NewsInfoHome',
  headerLayoutPreset: 'center',
  defaultNavigationOptions: Platform.OS === 'ios' ? {} : {
    headerForceInset: { top: getStatusBarHeight() }
  }
});


export default Info;
