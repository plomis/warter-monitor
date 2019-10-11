
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Tabs from '../../../../components/Tabs';
import EmptyList from '../../../../components/EmptyList';


const tabs = [
  { title: '水利大厦' },
  { title: '水务楼' }
];


function Block() {
  return (
    <View>
      <Text style={styles.title}>计量图谱</Text>
      <Tabs tabs={tabs}>
        <View style={styles.tabItem}>
          <EmptyList />
        </View>
        <View style={styles.tabItem}>
          <EmptyList />
        </View>
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    padding: 16,
    backgroundColor: '#fff'
  },
  title: {
    // backgroundColor: '#fff',
    height: 64,
    paddingTop: 32,
    textAlign: 'center',
    color: '#585E6F',
    fontSize: 20
  }
});

export default Block;
