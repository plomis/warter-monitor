
import React, { useEffect } from 'react';
import moment from 'moment';
import { Calendar } from 'react-native-calendars';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import EmptyList from '../../../components/EmptyList';
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

const ListFooter = connect(({ measure }) => {
  return {
    list: measure.online,
    loading: measure.listLoading,
    pageSize: measure.pageSize,
    pageLimit: measure.pageLimit
  };
})(({ loading, pageSize, pageLimit, list }) => {
  return (
    <View style={styles.listFooter}>
      <Text style={{ color: 'rgba(0,0,0,0.4)' }}>
        {pageSize > pageLimit && list && list.length > 0 ? '没有更多数据' : loading ? '加载数据...' : ''}
      </Text>
    </View>
  );
});


function Block({ dispatch, listLoading, list, pageIndex, pageSize, info }) {


  const handleFetch = ( page = 1 ) => async () => {
    const startDay = moment().add( pageSize * ( 0 - page ), 'month' ).startOf( 'month' );
    const endDay = moment().add( pageSize * ( 1 - page ), 'month' ).endOf( 'month' );
    dispatch({
      type: page === 1 ? 'measure.refreshOnline' : 'measure.getOnline',
      payload: {
        meterId: info.meterId,
        beginDay: startDay.format( 'YYYY-MM-DD' ),
        endDay: page === 1 ? moment().format( 'YYYY-MM-DD' ) : endDay.format( 'YYYY-MM-DD' ),
        pageIndex: page
      }
    });
  };

  useEffect(() => {
    handleFetch()();
    return () => dispatch({
      type: 'measure.update',
      payload: {
        pageIndex: 1,
        pageLimit: pageSize,
        listLoading: false
      }
    });
  }, []);

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
                  {data ? `${Math.round( data.onLineRate * 10000 ) / 100}`: ''}
                  {data ? <Text style={[ styles.unit, color ? { color } : {}]}>%</Text> : null}
                </Text>
              </View>
            </View>
          );
        }} />
    );
  };

  return (
    <FlatList
      data={list}
      refreshing={pageIndex !== 1 && listLoading}
      onRefresh={handleFetch()}
      // stickySectionHeadersEnabled={false}
      style={styles.scrollview}
      keyExtractor={( item ) => item.month}
      renderItem={({ item }) => renderItem( item )}
      onEndReached={handleFetch( pageIndex + 1 )}
      ListFooterComponent={ListFooter}
      ListEmptyComponent={!listLoading && list && list.length === 0 ? EmptyList : null} />
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
  },
  listFooter: {
    height: 64,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

Block.navigationOptions = () => {
  return {
    title: '在线历史'
  };
};

export default connect(({ measure }) => {
  return {
    info: measure.info ? measure.info.originalData : null,
    list: measure.online && makeSections( measure.online ),
    listLoading: measure.listLoading,
    pageIndex: measure.pageIndex,
    pageSize: measure.pageSize
  };
})( Block );
