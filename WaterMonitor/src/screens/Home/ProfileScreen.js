
import React from 'react';
import { NavigationEvents } from 'react-navigation';
import { SafeAreaView, StyleSheet, View, Text, Image } from 'react-native';
import { List } from '@ant-design/react-native';
import { connect } from '../../utils/plodux';


const Item = List.Item;

function Screen({ dispatch }) {

  const handleWillFocus = () => {
    dispatch({
      type: 'statusBar.update',
      payload: {
        barStyle: 'dark-content'
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavigationEvents onWillFocus={handleWillFocus} />
      <View style={styles.header}>
        <View style={styles.profile}>
          <View style={styles.pic}>
            <View style={styles.shadow} />
            <View style={styles.backgroundColor} />
            <Image style={styles.image} resizeMode="cover" source="https://image.shutterstock.com/image-photo/mountains-during-sunset-beautiful-natural-260nw-407021107.jpg" />
          </View>
          <Text style={styles.title}>
            鱼人爱先
          </Text>
        </View>
      </View>
      <View style={styles.menu}>
        <List>
          <Item arrow="horizontal" onPress={() => {}}>
            <Text style={styles.listText}>手机号码</Text>
          </Item>
          <Item arrow="horizontal" onPress={() => {}}>
            <Text style={styles.listText}>修改密码</Text>
          </Item>
          <Item arrow="horizontal" onPress={() => {}}>
            <Text style={styles.listText}>退出登录</Text>
          </Item>
        </List>
      </View>
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
    overflow: 'hidden'
  },
  title: {
    marginTop: 16,
    textAlign: 'center',
    color: '#585E6F'
  },
  listText: {
    color: '#595e6d'
  }
});

export default connect()( Screen );
