
import React, { useEffect } from 'react';
import { NavigationEvents } from 'react-navigation';
import { SafeAreaView, StyleSheet, View, Text, Image } from 'react-native';
import { List, Button } from '@ant-design/react-native';
import withUpdate from '../../utils/withUpdate';
import { connect } from '../../utils/plodux';
import { getUrl } from '../../utils/request/urls';


const Item = List.Item;
const Brief = Item.Brief;

function Screen({ navigation, dispatch, info, checkUpdate, version }) {

  const headUrl = info ? `${getUrl( 'head_get' )}?fileName=${info.headFileName}` : '';

  const handleWillFocus = () => {
    dispatch({
      type: 'statusBar.update',
      payload: {
        barStyle: 'dark-content'
      }
    });
  };

  const handleLogout = () => {
    dispatch({ type: 'global.logout' });
  };

  const userFetch = () => {
    dispatch({
      type: 'user.getInfo'
    });
  };

  useEffect(() => {
    userFetch();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <NavigationEvents onWillFocus={handleWillFocus} />
      <View style={styles.header}>
        <View style={styles.profile}>
          <View style={styles.pic}>
            <View style={styles.shadow} />
            <View style={styles.backgroundColor} />
            <Image style={styles.image} resizeMode="cover" source={{ uri: headUrl }} />
          </View>
          <Text style={styles.title}>
            {info ? info.userName : '--'}
          </Text>
        </View>
      </View>
      <View style={styles.menu}>
        <List>
          <Item arrow="horizontal" onPress={() => {
            navigation.navigate( 'Contact', {
              title: '手机号码'
            });
          }}>
            <Text style={styles.listText}>手机号码</Text>
          </Item>
          <Item arrow="horizontal" onPress={() => {
            navigation.navigate( 'Password', {
              title: '修改密码'
            });
          }}>
            <Text style={styles.listText}>修改密码</Text>
          </Item>
        </List>
        <List renderHeader={' '}>
          <Item arrow="horizontal" onPress={checkUpdate}>
            <Text style={styles.listText}>检查更新</Text><Brief style={{ fontSize: 12 }}>当前版本：{version}</Brief>
          </Item>
        </List>
      </View>
      <Button type="primary" style={styles.logout} onPress={handleLogout}>退出登录</Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f3fd'
  },
  header: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pic: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backgroundColor: {
    width: 80,
    height: 80,
    borderRadius: 40,
    position: 'absolute',
    backgroundColor: '#fff'
  },
  shadow: {
    width: 96,
    height: 96,
    borderRadius: 48,
    position: 'absolute',
    backgroundColor: '#E0E3F1'
  },
  image: {
    width: 80,
    height: 80,
    position: 'absolute',
    borderRadius: 48,
    zIndex: 1
  },
  title: {
    marginTop: 16,
    textAlign: 'center',
    color: '#585E6F'
  },
  listText: {
    color: '#595e6d'
  },
  logout: {
    marginTop: 44,
    marginHorizontal: 16
  }
});

export default withUpdate( connect(({ user, global }) => {
  return {
    info: user.info,
    version: global.version
  };
})( Screen ));
