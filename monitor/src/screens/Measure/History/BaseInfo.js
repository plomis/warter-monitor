
import React from 'react';
import is from 'whatitis';
import { StyleSheet } from 'react-native';
import { List, InputItem, Text, View } from '@ant-design/react-native';
import { connect } from '../../../utils/plodux';


const names = {
  meterCode: {
    name: '计量编号',
    type: 'input'
  },
  energyTypeName: {
    name: '能耗分类',
    type: 'input'
  },
  meterRate: {
    name: '外置倍率',
    type: 'input',
    formater( value ) {
      return is.Number( value ) ? `${value}` : '--'
    }
  },
  deviceModel: {
    name: '设备编号',
    type: 'input'
  },
  deviceModelName: {
    name: '设备型号',
    type: 'input'
  },
  todayOnLineRate: {
    name: '今日在线',
    type: 'input',
    formater( value ) {
      return is.Number( value ) ? `${Math.round( value * 10000 ) / 100}%` : '--'
    }
  },
  deviceInstallAddr: {
    name: '安装地址',
    type: 'input'
  }
};

function Block({ data }) {
  return (
    <View style={styles.container}>
      <List style={styles.list}>
        {Object.keys( data ).map(( key ) => {
          const value = data[key];
          if ( names[key]) {
            const { name, formater } = names[key];
            return (
              <InputItem key={key} value={formater ? formater( value ) : value} editable={false}>
                <Text style={styles.name}>{name}</Text>
              </InputItem>
            );
          }
          return null;
        })}
      </List>
    </View>
  );
}


Block.navigationOptions = () => {
  return {
    title: '基础信息'
  };
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F3FD'
  },
  list: {
    marginTop: 44
  },
  name: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.8)'
  }
});

export default connect(({ measure }) => {
  return {
    data: measure.info && measure.info.originalData // { meterCode: 'asdasd', energyType: 'asdasd', rate: 1, deviceCode: 'asd', deviceName: 'asdasd', onlineRate: 1, address: 'asdads' }
  };
})( Block );
