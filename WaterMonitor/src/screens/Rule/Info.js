
import React from 'react';
import { NavigationEvents } from 'react-navigation';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Icon, ActionSheet } from '@ant-design/react-native';
import { createStackNavigator, HeaderBackButton } from 'react-navigation-stack';
// import WebView from 'react-native-webview';
import PDFView from 'react-native-pdf-view';
import { ACTIVE_OPACITY } from '../../components/constants';
import { connect } from '../../utils/plodux';


function InfoComponent({ dispatch, navigation }) {

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
      <PDFView
        src={url}
        // onLoadComplete = {(pageCount)=>{
        //   this.pdfView.setNativeProps({
        //       zoom: 1.5
        //   });
        // }}
        style={styles.webview} />
      {/* <WebView
        zoomable={false}
        source={{ uri: url }}
        style={styles.webview}
        dataDetectorTypes="none"
        incognito
        hideKeyboardAccessoryView
        applicationNameForUserAgent="Thingspower/1.0.0" /> */}
    </View>
  );
}

InfoComponent.navigationOptions = ({ navigation }) => {
  const title = navigation.getParam( 'title' );

  const handleShowActionSheet = () => {
    ActionSheet.showActionSheetWithOptions({
      options: [ '下载', '取消' ],
      cancelButtonIndex: 1
    }, ( buttonIndex ) => {
      if ( buttonIndex === 0 ) {
        Alert.alert('敬请期待！');
      }
    });
  };

  return {
    title,
    headerRight: (
      <TouchableOpacity activeOpacity={ACTIVE_OPACITY} onPress={handleShowActionSheet}>
        <Icon name="ellipsis" size={32} color="#047FFE" style={{ marginRight: 16 }} />
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


const Info = createStackNavigator({
  InfoHome: {
    screen: connect()( InfoComponent )
  }
}, {
  initialRouteName: 'InfoHome',
  headerLayoutPreset: 'center'
});


export default Info;
