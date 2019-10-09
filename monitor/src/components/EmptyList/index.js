
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


function Empty({ text, style }) {
  return (
    <View style={[styles.empty, style ]}>
      <Text style={{ color: 'rgba(0,0,0,0.6)' }}>{text || '暂无数据'}</Text>
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
