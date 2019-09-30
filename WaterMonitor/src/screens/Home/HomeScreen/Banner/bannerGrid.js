
import React from 'react';
import is from 'whatitis';
import { View, StyleSheet, Text } from 'react-native';


function Item({ title, unit, nummber }) {
  return (
    <View style={styles.item}>
      <View style={styles.itemMain}>
        <Text style={styles.itemMainNum}>
          {is.Defined( nummber ) ? Math.round( nummber * 10000 ) / 100 : '--'}
        </Text>
        <Text style={styles.itemMainUnit}>
          {unit}
        </Text>
      </View>
      <Text style={styles.itemSub}>
        {title}
      </Text>
    </View>
  );
}

const datas = [{
  title: '上月非水量',
  unit: '吨',
  dataKey: 'reuseLastMonthDosage'
}, {
  title: '上月漏损',
  unit: '吨',
  dataKey: 'lastMonthLoss'
}, {
  title: '昨日非水',
  unit: '吨',
  dataKey: 'reuseYesterdayDosage'
}, {
  title: '上月日均',
  unit: '吨',
  dataKey: 'lastMonthAvgDayDosage'
}, {
  title: '夜间最小流量',
  unit: '吨',
  dataKey: 'todayMinFlow'
}, {
  title: '昨日人均',
  unit: '升',
  dataKey: 'yesterdayAvgPersonDosage'
}];

function Grid({ data }) {
  return (
    <View style={styles.container}>
      <View style={styles.line}>
        <View style={styles.line1} />
        <View style={styles.line2} />
      </View>
      {datas.map( ItemData =>
        <Item key={ItemData.dataKey} {...ItemData} nummber={data[ItemData.dataKey]} />
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    textAlign: 'center',
    alignContent: 'stretch',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 6,
    padding: 10
  },
  line: {
    top: 10,
    left: 10,
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: -1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    flexDirection: 'row'
  },
  line1: {
    flex: 1,
    height: 1,
    marginLeft: 16,
    marginRight: 16,
    backgroundColor: 'rgba(255,255,255,0.2)'
  },
  line2: {
    flex: 0,
    position: 'absolute',
    height: '100%',
    width: '33.33%',
    borderColor: 'rgba(255,255,255,0.2)',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderStyle: 'solid'
  },
  item: {
    flex: 0,
    width: '33.33%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemMain: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemMainNum: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 2,
    color: 'rgba(255,255,255,0.9)'
  },
  itemMainUnit: {
    fontSize: 12,
    marginTop: 2,
    color: 'rgba(255,255,255,0.8)'
  },
  itemSub: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
    color: 'rgba(255,255,255,0.7)'
  }
});

export default Grid;
