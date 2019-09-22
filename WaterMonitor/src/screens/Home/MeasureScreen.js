
import React, { useContext } from 'react';
import { NavigationEvents, ThemeContext } from 'react-navigation';
import { Text, ScrollView, SafeAreaView, StyleSheet, View, RefreshControl } from 'react-native';
import { List } from '@ant-design/react-native';
import { ThemeConstants } from '../../components/constants';
import { connect } from '../../utils/plodux';


const Item = List.Item;

const data = [{
  title: '水利大厦1层用水',
  dosage: 26
}, {
  title: '水利大厦2层用水',
  dosage: 26
}, {
  title: '水利大厦3层用水',
  dosage: 26
}, {
  title: '水利大厦4层用水',
  dosage: 26
}, {
  title: '水利大厦5层用水',
  dosage: 26
}, {
  title: '水利大厦6层用水',
  dosage: 26
}, {
  title: '水利大厦7层用水',
  dosage: 26
}, {
  title: '水利大厦8层用水',
  dosage: 26
}, {
  title: '水利大厦9层用水',
  dosage: 26
}, {
  title: '水利大厦10层用水',
  dosage: 26
}, {
  title: '水利大厦11层用水',
  dosage: 26
}, {
  title: '水利大厦12层用水',
  dosage: 26
}, {
  title: '水利大厦13层用水',
  dosage: 26
}];

function Screen({ dispatch }) {

  const theme = useContext( ThemeContext );
  const handleDidFocus = () => {
    dispatch({
      type: 'statusBar.update',
      payload: {
        barStyle: 'dark-content'
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavigationEvents onDidFocus={handleDidFocus} />
      <View style={[ styles.header, {
        borderColor: ThemeConstants[theme].borderTopColor,
        borderBottomWidth: 1,
        marginBottom: -1,
        zIndex: 1
      }]}>
        <View style={styles.headerItem}>
          <Text style={styles.title}>表具总数</Text>
          <View style={styles.content}>
            <Text style={styles.value}>320</Text>
            <Text style={styles.unit}>个</Text>
          </View>
        </View>
        <View style={styles.headerItem}>
          <Text style={styles.title}>在线</Text>
          <View style={styles.content}>
            <Text style={styles.value}>320</Text>
            <Text style={styles.unit}>个</Text>
          </View>
        </View>
        <View style={styles.headerItem}>
          <Text style={styles.title}>在线率</Text>
          <View style={styles.content}>
            <Text style={styles.value}>320</Text>
            <Text style={styles.unit}>%</Text>
          </View>
        </View>
      </View>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={() => {}} />
        }>
        <List>
          {data.map(({ title }) => {
            const extra = (
              <View style={styles.extra}>
                <View style={styles.extraWrap}>
                  <Text style={styles.extraValue}>12313</Text>
                  <Text style={styles.extraUnit}>吨</Text>
                </View>
              </View>
            );
            return (
              <Item key={title} extra={extra} arrow="horizontal" onPress={() => {}}>
                <View style={styles.itemTitle}>
                  <View style={styles.dot} />
                  <Text style={styles.itemTitleText}>{title}</Text>
                </View>
              </Item>
            );
          })}
        </List>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#F1F3FD'
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 64
  },
  headerItem: {
    flex: 0,
    width: '33.33%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    height: 14,
    lineHeight: 14,
    fontSize: 14,
    color: '#878c9a',
    marginBottom: 8
  },
  content: {
    flexDirection: 'row'
  },
  value: {
    height: 16,
    lineHeight: 16,
    fontSize: 16,
    color: '#595e6d',
    marginRight: 2
  },
  unit: {
    fontSize: 12,
    color: '#595e6d'
  },
  extra: {
    flex: 1,
    alignItems: 'flex-end',
  },
  extraWrap: {
    flex: 0,
    padding: 6,
    width: 100,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    borderRadius: 4,
    backgroundColor: 'rgba(80, 88, 247, 0.3)'
  },
  extraValue: {
    fontSize: 12,
    color: '#5058f7',
    marginRight: 4
  },
  extraUnit: {
    fontSize: 12,
    color: '#5058f7'
  },
  itemTitle: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  itemTitleText: {
    color: '#595e6d'
  },
  dot: {
    flex: 0,
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 8,
    backgroundColor: '#00cc00'
  }
});

export default connect()( Screen );
