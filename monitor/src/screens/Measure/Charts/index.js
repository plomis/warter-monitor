
import React from 'react';
import moment from 'moment';
import { View, StyleSheet, Text } from 'react-native';
import Tabs from '../../../components/Tabs';
import { connect } from '../../../utils/plodux';
import Charts from './Charts';


const tabs = [
  { title: '今日' },
  { title: '近30天' },
  { title: '近一年' }
];


function Block( props ) {
  return (
    <Tabs tabs={tabs} style={styles.constainer}>
      <View style={styles.tabItem}>
        <Text style={styles.chartTitle}>今日用水趋势</Text>
        <Text style={styles.chartSubTitle}>0时 ~ 24时</Text>
        <Charts type="hour" data={props['today'] || []} />
      </View>
      <View style={styles.tabItem}>
        <Text style={styles.chartTitle}>近30天用水趋势</Text>
        <Text style={styles.chartSubTitle}>{moment().add( -29, 'day' ).format( 'YYYY-MM-DD' )} ~ {moment().format( 'YYYY-MM-DD' )}</Text>
        <Charts type="day" data={props['30day'] || []} />
      </View>
      <View style={styles.tabItem}>
        <Text style={styles.chartTitle}>近一年用水趋势</Text>
        <Text style={styles.chartSubTitle}>{moment().add( -11, 'day' ).format( 'YYYY-MM' )} ~ {moment().format( 'YYYY-MM' )}</Text>
        <Charts type="year" data={props['12month'] || []} />
      </View>
    </Tabs>
  );
}

const styles = StyleSheet.create({
  constainer: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#ddd'
  },
  tabItem: {
    padding: 16,
    backgroundColor: '#fff'
  },
  chartTitle: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 20,
    height: 20,
    color: 'rgba(0,0,0,0.9)',
    marginBottom: 4
  },
  chartSubTitle: {
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 18,
    height: 18,
    color: 'rgba(0,0,0,0.6)',
    marginBottom: 4
  }
});

export default connect(({ measure }) => {
  return {
    'today': measure['today'],
    '30day': measure['30day'],
    '12month': measure['12month']
  };
})( Block );
