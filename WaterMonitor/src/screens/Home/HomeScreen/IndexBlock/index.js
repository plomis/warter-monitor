
import React from 'react';
import is from 'whatitis';
import SvgUri from 'react-native-svg-uri';
import { View, StyleSheet, Text } from 'react-native';
import icon1 from '../../../../assets/svg/indexblock_1.svg';
import icon2 from '../../../../assets/svg/indexblock_2.svg';
import icon3 from '../../../../assets/svg/indexblock_3.svg';
import icon4 from '../../../../assets/svg/indexblock_4.svg';
import icon5 from '../../../../assets/svg/indexblock_5.svg';
import icon6 from '../../../../assets/svg/indexblock_6.svg';


const datas = [{
  title: '非常规水月替代率',
  dataKey: 'monthReuseReplaceRate',
  icon: icon1
}, {
  title: '月漏损率',
  dataKey: 'monthLossRate',
  icon: icon2
}, {
  title: '水计量率',
  dataKey: 'meterRate',
  icon: icon3
}, {
  title: '表具在线率',
  dataKey: 'meterOnlineRate',
  icon: icon4
}, {
  title: '中央空调补水率',
  dataKey: 'airConditionerSupplyRate',
  icon: icon5
}, {
  title: '节水器具普及率',
  dataKey: 'saveWaterDeviceRate',
  icon: icon6
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
                  style={styles.icon}
                  source={itemData.icon} />
              </View>
              <View style={styles.value}>
                <Text style={styles.number}>
                  {is.Defined( data[itemData.dataKey] ) ? Math.round( data[itemData.dataKey] * 10000 ) / 100 : '--'}
                </Text>
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
    padding: 16,
    paddingTop: 32,
    backgroundColor: '#F1F3FD'
  },
  item: {
    flex: 0,
    width: '33.33%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16
  },
  top: {
    flex: 0,
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8
  },
  circle: {
    top: 10,
    left: 10,
    width: 80,
    height: 80,
    position: 'absolute',
    backgroundColor: '#5058f7',
    borderRadius: 50
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    top: 5,
    left: 5,
    height: 90,
    width: 90,
    position: 'absolute',
    backgroundColor: '#F1F3FD',
    borderRadius: 50
  },
  value: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  number: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'rgba(255,255,255,0.9)'
  },
  percent: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)'
  },
  bottom: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    height: 50,
    width: 85,
    color: '#595e6d'
  }
});

export default IndexBlock;
