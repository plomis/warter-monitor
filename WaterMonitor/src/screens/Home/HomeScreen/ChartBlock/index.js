
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Tabs } from '@ant-design/react-native';


const tabs = [
  { title: '今日' },
  { title: '近30天' },
  { title: '近一年' }
];


function Block() {
  return (
    <View>
      <Tabs tabs={tabs}>
        <View style={styles.tabItem}>
          <Text>Content of First Tab</Text>
        </View>
        <View style={styles.tabItem}>
          <Text>Content of Second Tab</Text>
        </View>
        <View style={styles.tabItem}>
          <Text>Content of Third Tab</Text>
        </View>
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    padding: 16,
    height: 225,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
});

export default Block;
