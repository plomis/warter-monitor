
import React, { useState } from 'react';
import { NavigationEvents } from 'react-navigation';
import { View, StyleSheet, Platform, ScrollView } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { createStackNavigator, HeaderBackButton } from 'react-navigation-stack';
import { Button, Text, InputItem, List, ActivityIndicator, Toast } from '@ant-design/react-native';
import getPasswordStrength from '../../utils/strength';
import { connect } from '../../utils/plodux';


function Password({ dispatch, navigation, loading }) {

  const [ oldPwd, setOldPwd ] = useState( '' );
  const [ newPwd, setNewPwd ] = useState( '' );
  const [ commitPwd, setCommitPwd ] = useState( '' );
  const [ strength, setStrength ] = useState( 0 );
  const [ strengthText, setStrengthText ] = useState( '' );
  const [ strengthStyle, setStrengthStyle ] = useState({});

  const handleWillFocus = () => {
    dispatch({
      type: 'statusBar.update',
      payload: {
        barStyle: 'dark-content'
      }
    });
  };

  const handleChange = ( value ) => {
    if ( value ) {
      const pass = getPasswordStrength( value );
      const strength = pass.level();
      setStrength( strength === 'VERY_WEAK'
        ? 1 : strength === 'WEAK'
        ? 2 : strength === 'GOOD'
        ? 3 : strength === 'STRONG'
        ? 4 : strength === 'VERY_STRONG'
        ? 5 : 6 );
      setStrengthText( pass.levelText());
      setStrengthStyle({
        color: strength === 'VERY_WEAK'
          ? 'hsl(70, 68%, 60%)' : strength === 'WEAK'
          ? 'hsl(85, 68%, 60%)' : strength === 'GOOD'
          ? 'hsl(100, 68%, 60%)' : strength === 'STRONG'
          ? 'hsl(115, 68%, 60%)' : strength === 'VERY_STRONG'
          ? 'hsl(130, 68%, 60%)' : 'hsl(130, 68%, 60%)'
      })
    } else {
      setStrength( 0 );
      setStrengthText( '' );
      setStrengthStyle({});
    }
    setNewPwd( value );
  };

  const handleUpdate = () => {
    if ( !oldPwd || !newPwd || !commitPwd ) {
      Toast.fail( '请填写完整！' );
    } else if ( newPwd !== commitPwd ) {
      Toast.fail( '新密码两次输入不一致！' );
    } else if ( oldPwd === newPwd ) {
      Toast.fail( '新密码不能与旧密码相同！' );
    } else if ( strength > 2 ) {
      Toast.fail( '新密码的强度必须达到“好”！' );
    } else {
      dispatch({
        type: 'user.updatePassword',
        callback: () => navigation.navigate( 'Profile' ),
        payload: {
          oldPwd, newPwd, commitPwd
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
            clear
            type="password"
            value={oldPwd}
            onChange={setOldPwd}
            placeholder="旧密码" />
          <InputItem
            clear
            type="password"
            value={newPwd}
            onChange={handleChange}
            placeholder="新密码"
            extra={<Text style={strengthStyle}>{strengthText}</Text>} />
          <InputItem
            clear
            type="password"
            value={commitPwd}
            onChange={setCommitPwd}
            placeholder="再输一次" />
        </List>
        <Button disabled={!oldPwd || !newPwd || !commitPwd}  style={styles.submit} onPress={handleUpdate} type="primary">
          保存
        </Button>
      </ScrollView>
      {loading ? <ActivityIndicator toast text="正在保存" /> : null}
    </View>
  );
}

Password.navigationOptions = ({ navigation }) => {
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
  submit: {
    marginTop: 40,
    marginHorizontal: 16
  }
});


export default createStackNavigator({
  PasswordHome: {
    screen: connect(({ user }) => {
      return {
        loading: user.loading
      };
    })( Password )
  }
}, {
  initialRouteName: 'PasswordHome',
  headerLayoutPreset: 'center',
  defaultNavigationOptions: Platform.OS === 'ios' ? {} : {
    headerForceInset: { top: getStatusBarHeight() }
  }
});
