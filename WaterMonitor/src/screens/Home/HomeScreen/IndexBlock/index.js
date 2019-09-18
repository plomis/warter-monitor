
import React from 'react';
import SvgUri from 'react-native-svg-uri';
import { View, StyleSheet, Text } from 'react-native';


const datas = [{
  title: '非常规水月替代率',
  dataKey: '',
  icon: ''
}];


function IndexBlock({ data, style }) {
  return (
    <View style={[ styles.container, style ]}>
      {datas.map(( itemData ) => {
        return (
          <View key={itemData.dataKey} style={styles.item}>
            <View style={styles.top}>
              <View style={styles.shadow} />
              <View style={styles.circle} />
              <View style={styles.icon}>
                <SvgUri
                  width="40"
                  height="40"
                  source={itemData.icon}
                  style={styles.icon} />
              </View>
              <View style={styles.value}>
                <Text style={styles.number}>{data[itemData.dataKey]}</Text>
                <Text style={styles.percent}>%</Text>
              </View>
            </View>
            <Text style={styles.bottom}>
              {itemData.title}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'stretch',
    padding: 16
  }
});

export default IndexBlock;
