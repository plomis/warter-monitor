
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { List } from '@ant-design/react-native';


const Item = List.Item;

function Block({ data }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>规章制度</Text>
      <List>
        {data.map(({ title }, index ) => {
          return (
            <Item key={title + index} arrow="horizontal" onPress={() => {}}>
              {title}
            </Item>
          );
        })}
      </List>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 64
  },
  title: {
    height: 64,
    paddingTop: 32,
    textAlign: 'center',
    color: '#585E6F',
    fontSize: 20
  }
});

export default Block;
