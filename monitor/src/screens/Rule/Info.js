
import React from 'react';
import { NavigationEvents } from 'react-navigation';
import { View, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { Icon, ActionSheet } from '@ant-design/react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { createStackNavigator, HeaderBackButton } from 'react-navigation-stack';
import PDFView from 'react-native-view-pdf';
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
        resource={url}
        resourceType="url"
        style={styles.webview} />
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


export default createStackNavigator({
  RuleInfoHome: {
    screen: connect()( InfoComponent )
  }
}, {
  initialRouteName: 'RuleInfoHome',
  headerLayoutPreset: 'center',
  defaultNavigationOptions: Platform.OS === 'ios' ? {} : {
    headerForceInset: { top: getStatusBarHeight() }
  }
});
