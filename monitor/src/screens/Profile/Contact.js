
import React, { useState } from 'react';
import { NavigationEvents } from 'react-navigation';
import { View, StyleSheet, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { createStackNavigator, HeaderBackButton } from 'react-navigation-stack';
import { Button, Text, InputItem, List, ActivityIndicator, Toast } from '@ant-design/react-native';
import { connect } from '../../utils/plodux';


function Contect({ dispatch, navigation, loading, restSeconds }) {

  const [ number, setNumber ] = useState( '' );
  const [ valiCode, setValiCode ] = useState( '' );

  const handleWillFocus = () => {
    dispatch({
      type: 'statusBar.update',
      payload: {
        barStyle: 'dark-content'
      }
    });
  };

  const handleValiCode = () => {
    if ( !number ) {
      Toast.fail( '必须填写手机号码！' );
    } else if ( restSeconds === 0 ) {
      dispatch({
        type: 'user.getVertifyCode',
        payload: {
          mobileNo: number.replace( /\s/g, '' )
        }
      });
    }
  };

  const handleUpdate = () => {
    if ( !number ) {
      Toast.fail( '必须填写手机号码！' );
    } else if ( !valiCode ) {
      Toast.fail( '必须填验证码！' );
    } else if ( restSeconds === 0 ) {
      dispatch({
        type: 'user.updateMobile',
        callback: () => navigation.navigate( 'Profile' ),
        payload: {
          mobileNo: number.replace( /\s/g, '' ),
          vertifyCode: valiCode
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={handleWillFocus} />
      <ScrollView style={styles.scrollview}>
        <List style={styles.list}>
          <InputItem
            type="phone"
            value={number}
            onChange={setNumber}
            placeholder="手机号码" />
          <InputItem
            value={valiCode}
            onChange={setValiCode}
            extra={(
              <TouchableOpacity onPress={handleValiCode}>
                <Text style={styles.valiCodeText}>{restSeconds > 0 ? `${restSeconds}s后再次发送` : '获取验证码'}</Text>
              </TouchableOpacity>
            )}
            placeholder="验证码" />
        </List>
        <Button disabled={!number || !valiCode} style={styles.submit} onPress={handleUpdate} type="primary">
          绑定手机号码
        </Button>
      </ScrollView>
      {loading ? <ActivityIndicator toast text="正在保存" /> : null}
    </View>
  );
}

Contect.navigationOptions = ({ navigation }) => {
  const title = navigation.getParam( 'title' );
  return {
    title,
    headerLeft: <HeaderBackButton onPress={() => navigation.navigate( 'Profile' )} />
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollview: {
    flex: 1,
    backgroundColor: '#F1F3FD'
  },
  list: {
    marginTop: 40
  },
  valiCodeText: {
    zIndex: 1,
    fontSize: 16,
    color: '#0B8EE9'
  },
  submit: {
    marginTop: 40,
    marginHorizontal: 16
  }
});


export default createStackNavigator({
  ContectHome: {
    screen: connect(({ user }) => {
      return {
        loading: user.loading,
        restSeconds: user.restSeconds
      };
    })( Contect )
  }
}, {
  initialRouteName: 'ContectHome',
  headerLayoutPreset: 'center',
  defaultNavigationOptions: Platform.OS === 'ios' ? {} : {
    headerForceInset: { top: getStatusBarHeight() }
  }
});
