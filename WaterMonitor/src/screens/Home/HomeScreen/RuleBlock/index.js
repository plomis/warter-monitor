
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { List, Icon } from '@ant-design/react-native';
// import Icon from 'react-native-vector-icons/AntDesign';
import { outlineGlyphMap } from '@ant-design/icons-react-native/lib/outline';
import { AlertOutline } from "@ant-design/icons-svg";


const Item = List.Item;

function Block({ data }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>规章制度</Text>
      <List>
        {data.map(({ title, date }, index ) => {
          const extra = <Text style={styles.itemExtra}>{date}</Text>;
          return (
            <Item
              key={title + index}
              arrow="horizontal"
              onPress={() => {}}
              thumb={<Icon name={AlertOutline} color="#5058f7" size={14} />}
              extra={extra}>
              <Text style={styles.itemTitle}>{title}</Text>
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
  },
  itemTitle: {
    color: '#585E6F'
  },
  itemExtra: {
    color: '#585E6F'
  }
});

export default Block;
