
import moment from 'moment';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Tabs from '../../../../components/Tabs';
import Chart1 from './Chart1';
import Chart2 from './Chart2';


const tabs = [
  { title: '今日' },
  { title: '近30天' },
  { title: '近一年' }
];

function Block({ data }) {
  return (
    <Tabs tabs={tabs}>
      <View style={styles.tabItem}>
        <View style={styles.chart}>
          <Text style={styles.chartTitle}>今日用水趋势</Text>
          <Text style={styles.chartSubTitle}>0时 ~ 24时</Text>
          <Chart1 type="hour" data={data.today ? data.today.use : []} />
        </View>
        <View style={styles.chart}>
          <Text style={styles.chartTitle}>今日分项用量</Text>
          <Chart2 height={300} data={data.today ? data.today.subitem : []} />
        </View>
      </View>
      <View style={styles.tabItem}>
        <View style={styles.chart}>
          <Text style={styles.chartTitle}>近30天用水趋势</Text>
          <Text style={styles.chartSubTitle}>{moment().add( -29, 'day' ).format( 'YYYY-MM-DD' )} ~ {moment().format( 'YYYY-MM-DD' )}</Text>
          <Chart1 type="day" data={data['30Day'] ? data['30Day'].use : []} />
        </View>
        <View style={styles.chart}>
          <Text style={styles.chartTitle}>近30天分项用量</Text>
          <Chart2 height={300} data={data['30Day'] ? data['30Day'].subitem : []} />
        </View>
      </View>
      <View style={styles.tabItem}>
        <View style={styles.chart}>
          <Text style={styles.chartTitle}>近一年用水趋势</Text>
          <Text style={styles.chartSubTitle}>{moment().add( -11, 'month' ).format( 'YYYY-MM' )} ~ {moment().format( 'YYYY-MM' )}</Text>
          <Chart1 type="year" data={data['12Month'] ? data['12Month'].use : []} />
        </View>
        <View style={styles.chart}>
          <Text style={styles.chartTitle}>近一年分项用量</Text>
          <Chart2 height={300} data={data['12Month'] ? data['12Month'].subitem : []} />
        </View>
      </View>
    </Tabs>
  );
}

const styles = StyleSheet.create({
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
  },
  chart: {
    marginBottom: 24
  }
});

export default Block;
