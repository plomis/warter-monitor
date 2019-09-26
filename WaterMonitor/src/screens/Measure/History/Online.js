
import React from 'react';
import moment from 'moment';
import { Calendar } from 'react-native-calendars';
import { StyleSheet, View, Text } from 'react-native';
import { ListView } from '@ant-design/react-native';
import { connect } from '../../../utils/plodux';


function makeSections( data ) {
  const sections = data.reduce(( sections, item ) => {
    const monthKey = moment( item.day ).format( 'MM月' );
    const month = moment( item.day ).format( 'YYYY-MM' );
    if ( !sections[monthKey]) {
      sections[monthKey] = {
        month, monthData: [ item ]
      };
    } else {
      sections[monthKey].monthData.push( item );
    }
    return sections;
  }, {});
  return Object.entries( sections ).map(([ title, { month, monthData }]) => {
    return { title, monthData, month };
  }).reverse();
}


function Block({ dispatch }) {

  const handleFetch = async ( page = 1, startFetch, abortFetch ) => {
    const pageLimit = 12;
    const startDay = moment().add( pageLimit * ( 1 - page ), 'month' ).startOf( 'month' );
    const endDay = moment().add( pageLimit * ( 1 - page ), 'month' ).endOf( 'month' );
    try {
      dispatch({
        type: 'measure.getOnline',
        callback: ( data ) => startFetch( makeSections( data ), pageLimit ),
        payload: {
          meterId: 247,
          beginDay: startDay.format( 'YYYY-MM-DD' ),
          endDay: page === 1 ? moment().format( 'YYYY-MM-DD' ) : endDay.format( 'YYYY-MM-DD' )
        }
      });
    } catch( err ) {
      abortFetch();
    }
  };

  const renderItem = ({ monthData, month }) => {
    const minDate = moment( month, 'YYYY-MM' ).startOf( 'month' ).format( 'YYYY-MM-DD' );
    const maxDate = moment( month, 'YYYY-MM' ).endOf( 'month' ).format( 'YYYY-MM-DD' );
    return (
      <Calendar
        key={month}
        hideArrows
        hideExtraDays
        disableMonthChange
        current={minDate}
        minDate={minDate}
        maxDate={maxDate}
        monthFormat={'yyyy年 MM月'}
        firstDay={1}
        style={styles.calendar}
        dayComponent={({ date }) => {
          const data = monthData.find(({ day }) => day === date.dateString );
          const backgroundColor = ( !data || data.onLineRate > 0.98 ) ? 'rgba(255, 255, 255, 0)'
            : data.onLineRate <= 0.98 && data.onLineRate > 0.85 ? 'rgb(255, 215, 94)' : 'rgb(255, 94, 94)';
          const color = ( data && data.onLineRate <= 0.85 ) ? '#fff' : null;
          return (
            <View key={date.dateString} style={styles.date}>
              <View style={[
                styles.dateContent,
                { backgroundColor }
              ]}>
                <Text style={[ styles.day, color ? { color } : {}]}>{date.day}</Text>
                <Text style={[ styles.rate, color ? { color } : {}]}>
                  {data ? `${data.onLineRate * 100}`: ''}
                  {data ? <Text style={[ styles.unit, color ? { color } : {}]}>%</Text> : null}
                </Text>
              </View>
            </View>
          );
        }} />
    );
  };

  return (
    <ListView
      refreshable={false}
      onFetch={handleFetch}
      style={styles.container}
      keyExtractor={item => item.month}
      renderItem={renderItem} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  date: {
    flexDirection: 'row',
    width: '100%',
    flex: 0
  },
  dateContent: {
    flex: 1,
    borderRadius: 4,
    alignItems: 'flex-end',
    marginRight: 4,
    padding: 2
  },
  day: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.6)'
  },
  rate: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.9)',
    marginTop: 4
  },
  unit: {
    fontSize: 10,
    color: 'rgba(0,0,0,0.6)'
  },
  calendar: {
    marginHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#DDD',
    paddingBottom: 16,
    marginBottom: 24
  }
});

Block.navigationOptions = () => {
  return {
    title: '在线历史'
  };
};

export default connect()( Block );
