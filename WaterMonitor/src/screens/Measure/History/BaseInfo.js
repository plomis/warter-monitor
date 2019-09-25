
import React from 'react';
import { StyleSheet } from 'react-native';
import { List, InputItem } from '@ant-design/react-native';
import { connect } from '../../../utils/plodux';


const names = {
  meterCode: {
    name: '计量编号',
    type: 'input'
  },
  energyType: {
    name: '能耗分类',
    type: 'input'
  },
  rate: {
    name: '外置倍率',
    type: 'input'
  },
  deviceCode: {
    name: '设备编号',
    type: 'input'
  },
  deviceName: {
    name: '设备型号',
    type: 'input'
  },
  onlineRate: {
    name: '今日在线',
    type: 'input'
  },
  address: {
    name: '安装地址',
    type: 'input'
  }
};

function Block({ data }) {
  return (
    <List>
      {Object.keys( data ).map(( key ) => {
        const value = data[key];
        if ( names[key]) {
          const { name } = names[key];
          return (
            <InputItem value={value} editable={false}>
              {name}
            </InputItem>
          );
        }
        return null;
      })}
    </List>
  );
}


Block.navigationOptions = () => {
  return {
    title: '基础信息'
  };
};


const styles = StyleSheet.create({
  item: {
    flex: 1,
    justifyContent: 'center'
  }
});

export default connect(({ measure }) => {
  return {
    data: { meterCode: 'asdasd', energyType: 'asdasd', rate: 1, deviceCode: 'asd', deviceName: 'asdasd', onlineRate: 1, address: 'asdads' }
  };
})( Block );
