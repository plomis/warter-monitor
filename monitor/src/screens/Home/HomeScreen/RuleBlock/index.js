
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { List, Icon } from '@ant-design/react-native';
import { withNavigation } from 'react-navigation';
import EmptyList from '../../../../components/EmptyList';
import { getUrl } from '../../../../utils/request/urls';


const Item = List.Item;

function Block({ data, navigation }) {

  const handlePress = ({ key, title }) => () => {
    navigation.navigate( 'RuleInfo', {
      url: `${getUrl( 'rule_file' )}?ruleId=${key}`,
      title
    });
  };

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>规章制度</Text>
      {!data ? (
        <EmptyList text="正在加载..." style={{ backgroundColor: '#fff' }} />
      ) : data.length === 0 ? (
        <EmptyList text="暂无数据" style={{ backgroundColor: '#fff' }} />
      ) : (
        <List>
          {data.map(({ key, title, date }) => {
            const extra = <Text style={styles.itemExtra}>{date}</Text>;
            return (
              <Item
                key={key}
                arrow="horizontal"
                onPress={handlePress({ key, title })}
                thumb={<Icon name="file-text" color="#5058f7" size={24} style={{ marginRight: 4 }} />}
                extra={extra}>
                <Text style={styles.itemTitle}>{title}</Text>
              </Item>
            );
          })}
        </List>
      )}
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

export default withNavigation( Block );
