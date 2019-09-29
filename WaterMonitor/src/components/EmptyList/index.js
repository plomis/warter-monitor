
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


function Empty() {
  return (
    <View style={styles.empty}>
      <Text style={{ color: 'rgba(0,0,0,0.6)' }}>暂无数据</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  empty: {
    height: 128,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Empty;
