
import React from 'react';
import { List } from '@ant-design/react-native';
import { View, StyleSheet, Text } from 'react-native';
import tuopu from '../../../../assets/svg/tuopu.svg';
import IconSvg from '../../../../components/IconSvg';


const Item = List.Item;

function Block({ data, navigation }) {

  const handleInfo = ( id ) => () => {
    navigation.navigate( 'BalanceInfo', { id });
  };

  return (
    <View>
      <Text style={styles.title}>计量图谱</Text>
      {data ? (
        <List>
          {data.map(({ balanceId, balanceName }) => {
            return (
              <Item
                key={`${balanceId}`}
                arrow="horizontal"
                onPress={handleInfo( balanceId )}
                thumb={<IconSvg name={tuopu} color="#5058f7" size={24} style={{ marginRight: 4 }} />}>
                <Text style={styles.itemTitle}>{balanceName}</Text>
              </Item>
            );
          })}
        </List>
      ) : (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>暂无数据</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  empty: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  emptyText: {
    color: 'rgba(0,0,0,0.6)',
    fontSize: 14
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
  }
});

export default Block;
