
import React from 'react';
import { NavigationEvents } from 'react-navigation';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '@ant-design/react-native';
import { createStackNavigator, HeaderBackButton } from 'react-navigation-stack';
import WebView from 'react-native-webview';
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
  return {
    title,
    headerRight: <TouchableOpacity onPress={() => {}}>
      <Icon name="share-alt" size={20} color="#047FFE" style={{ marginRight: 16 }} />
    </TouchableOpacity>,
    headerLeft: <HeaderBackButton onPress={navigation.goBack} />
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
    screen: connect()( NewsInfo )
  }
}, {
  initialRouteName: 'NewsInfoHome'
});


export default Info;
