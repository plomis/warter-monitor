
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Tabs } from '@ant-design/react-native';
import Chart1 from './Chart1';
import Chart2 from './Chart2';


const tabs = [
  { title: '今日' },
  { title: '近30天' },
  { title: '近一年' }
];

function Block() {
  return (
    <Tabs tabs={tabs}>
      <View style={styles.tabItem}>
        <View style={styles.chart}>
          <Text style={styles.chartTitle}>今日用水趋势</Text>
          <Text style={styles.chartSubTitle}>0时 ~ 24时</Text>
          <Chart1 type="hour" data={[
            { dayHour: '2019-9-27 00', dosage: 38 },
            { dayHour: '2019-9-27 01', dosage: 52 },
            { dayHour: '2019-9-27 02', dosage: 61 },
            { dayHour: '2019-9-27 03', dosage: 145 },
            { dayHour: '2019-9-27 04', dosage: 48 },
            { dayHour: '2019-9-27 05', dosage: 38 },
            { dayHour: '2019-9-27 06', dosage: 38 },
            { dayHour: '2019-9-27 07', dosage: 38 },
            { dayHour: '2019-9-27 08', dosage: 38 },
            { dayHour: '2019-9-27 09', dosage: 38 },
            { dayHour: '2019-9-27 10', dosage: 38 },
            { dayHour: '2019-9-27 11', dosage: 38 },
            { dayHour: '2019-9-27 12', dosage: 38 },
            { dayHour: '2019-9-27 13', dosage: 38 },
            { dayHour: '2019-9-27 14', dosage: 38 },
            { dayHour: '2019-9-27 15', dosage: 38 },
            { dayHour: '2019-9-27 16', dosage: 38 },
            { dayHour: '2019-9-27 17', dosage: 38 },
            { dayHour: '2019-9-27 18', dosage: 38 },
            { dayHour: '2019-9-27 19', dosage: 38 },
            { dayHour: '2019-9-27 20', dosage: 38 },
            { dayHour: '2019-9-27 21', dosage: 38 },
            { dayHour: '2019-9-27 22', dosage: 38 },
            { dayHour: '2019-9-27 23', dosage: 38 }
          ]} />
        </View>
        <View style={styles.chart}>
          <Text style={styles.chartTitle}>今日分项用量</Text>
          <Chart2 height={300} data={[{
              avgPeopleDosage: 20,
              percent: 0.1,
              subitemName: '学习'
            }, {
              avgPeopleDosage: 100,
              percent: 0.5,
              subitemName: '睡觉'
            }, {
              avgPeopleDosage: 10,
              percent: 0.05,
              subitemName: '吃饭'
            }, {
              avgPeopleDosage: 30,
              percent: 0.15,
              subitemName: '讲礼貌'
            }, {
              avgPeopleDosage: 10,
              percent: 0.05,
              subitemName: '其他'
            }, {
              avgPeopleDosage: 20,
              percent: 0.1,
              subitemName: '运动'
            }, {
              avgPeopleDosage: 10,
              percent: 0.05,
              subitemName: '暂无备注'
            }]} />
        </View>
      </View>
      <View style={styles.tabItem}>
        <View style={styles.chart}>
          <Text style={styles.chartTitle}>近30天用水趋势</Text>
          <Text style={styles.chartSubTitle}>2018-10-1 ~ 2018-10-30</Text>
          <Chart1 type="day" data={[
            { day: '2019-9-01', dosage: 52 },
            { day: '2019-9-02', dosage: 61 },
            { day: '2019-9-03', dosage: 145 },
            { day: '2019-9-04', dosage: 48 },
            { day: '2019-9-05', dosage: 38 },
            { day: '2019-9-06', dosage: 38 },
            { day: '2019-9-07', dosage: 38 },
            { day: '2019-9-08', dosage: 38 },
            { day: '2019-9-09', dosage: 38 },
            { day: '2019-9-10', dosage: 38 },
            { day: '2019-9-11', dosage: 38 },
            { day: '2019-9-12', dosage: 38 },
            { day: '2019-9-13', dosage: 38 },
            { day: '2019-9-14', dosage: 38 },
            { day: '2019-9-15', dosage: 38 },
            { day: '2019-9-16', dosage: 38 },
            { day: '2019-9-17', dosage: 38 },
            { day: '2019-9-18', dosage: 38 },
            { day: '2019-9-19', dosage: 38 },
            { day: '2019-9-20', dosage: 38 },
            { day: '2019-9-21', dosage: 38 },
            { day: '2019-9-22', dosage: 38 },
            { day: '2019-9-23', dosage: 38 },
            { day: '2019-9-24', dosage: 38 },
            { day: '2019-9-25', dosage: 38 },
            { day: '2019-9-26', dosage: 38 },
            { day: '2019-9-27', dosage: 38 },
            { day: '2019-9-28', dosage: 38 },
            { day: '2019-9-29', dosage: 38 },
            { day: '2019-9-30', dosage: 38 }
          ]} />
        </View>
        <View style={styles.chart}>
          <Text style={styles.chartTitle}>近30天分项用量</Text>
          <Chart2 height={300} data={[{
              avgPeopleDosage: 20,
              percent: 0.1,
              subitemName: '学习'
            }, {
              avgPeopleDosage: 100,
              percent: 0.5,
              subitemName: '睡觉'
            }, {
              avgPeopleDosage: 10,
              percent: 0.05,
              subitemName: '吃饭'
            }, {
              avgPeopleDosage: 30,
              percent: 0.15,
              subitemName: '讲礼貌'
            }, {
              avgPeopleDosage: 10,
              percent: 0.05,
              subitemName: '其他'
            }, {
              avgPeopleDosage: 20,
              percent: 0.1,
              subitemName: '运动'
            }, {
              avgPeopleDosage: 10,
              percent: 0.05,
              subitemName: '暂无备注'
            }]} />
        </View>
      </View>
      <View style={styles.tabItem}>
        <View style={styles.chart}>
          <Text style={styles.chartTitle}>近一年用水趋势</Text>
          <Text style={styles.chartSubTitle}>2019-01 ~ 2019-10</Text>
          <Chart1 type="year" data={[
            { yearMonth: '2019-01', dosage: 52 },
            { yearMonth: '2019-02', dosage: 61 },
            { yearMonth: '2019-03', dosage: 145 },
            { yearMonth: '2019-04', dosage: 48 },
            { yearMonth: '2019-05', dosage: 38 },
            { yearMonth: '2019-06', dosage: 38 },
            { yearMonth: '2019-07', dosage: 38 },
            { yearMonth: '2019-08', dosage: 38 },
            { yearMonth: '2019-09', dosage: 38 },
            { yearMonth: '2019-10', dosage: 38 },
            { yearMonth: '2019-11', dosage: 38 },
            { yearMonth: '2019-12', dosage: 38 }
          ]} />
        </View>
        <View style={styles.chart}>
          <Text style={styles.chartTitle}>近一年分项用量</Text>
          <Chart2 height={300} data={[{
              avgPeopleDosage: 20,
              percent: 0.1,
              subitemName: '学习'
            }, {
              avgPeopleDosage: 100,
              percent: 0.5,
              subitemName: '睡觉'
            }, {
              avgPeopleDosage: 10,
              percent: 0.05,
              subitemName: '吃饭'
            }, {
              avgPeopleDosage: 30,
              percent: 0.15,
              subitemName: '讲礼貌'
            }, {
              avgPeopleDosage: 10,
              percent: 0.05,
              subitemName: '其他'
            }, {
              avgPeopleDosage: 20,
              percent: 0.1,
              subitemName: '运动'
            }, {
              avgPeopleDosage: 10,
              percent: 0.05,
              subitemName: '暂无备注'
            }]} />
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
