
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { List } from '@ant-design/react-native';
import { connect } from '../../../utils/plodux';


const Item = List.Item;

function Block({ navigation }) {

  const handleBase = () => {
    navigation.navigate( 'BaseInfo' );
  };

  const handleOnline = () => {
    navigation.navigate( 'Online' );
  };

  const handleHistory = () => {
    navigation.navigate( 'History' );
  };

  return (
    <List style={styles.container}>
      <Item arrow="horizontal" onPress={handleBase}>
        <Text style={styles.itemTitle}>基本信息</Text>
      </Item>
      <Item arrow="horizontal" onPress={handleOnline}>
        <Text style={styles.itemTitle}>在线历史</Text>
      </Item>
      <Item arrow="horizontal" onPress={handleHistory}>
        <Text style={styles.itemTitle}>历史数据</Text>
      </Item>
    </List>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 44,
    marginBottom: 128
  },
  itemTitle: {
    color: '#585E6F'
  }
});

export default connect()( Block );
