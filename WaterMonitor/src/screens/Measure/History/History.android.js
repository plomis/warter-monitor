
import moment from 'moment';
import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, Button } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Icon } from '@ant-design/react-native';
import { ThemeContext } from 'react-navigation';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ACTIVE_OPACITY, HEADER_LARGE_HEIGHT, ThemeConstants } from '../../../components/constants';
import { connect } from '../../../utils/plodux';
import Table from './Table';


function Block({ dispatch, listLoading, list, vars, pageIndex, pageSize, info }) {


  const theme = useContext( ThemeContext );
  const statusBarHeight = getStatusBarHeight();
  const [ selected, setSelected ] = useState( moment());
  const [ show, setShow ] = useState( false );

  const handleChange = ( _event, date ) => {
    setShow( false );
    setSelected( moment( date ));
  };

  const handleOpen = () => {
    if ( !show ) {
      setShow( true );
    }
  };

  const handlePrev = () => {
    setSelected( selected.clone().add( -1, 'day' ));
  };

  const handleNext = () => {
    setSelected( selected.clone().add( 1, 'day' ));
  };

  const handleFetch = ( page = 1 ) => async () => {
    if ( !list || !listLoading ) {
      dispatch({
        type: page === 1 ? 'measure.refresHistory' : 'measure.getHistory',
        payload: {
          meterId: info.meterId,
          day: selected.format( 'YYYY-MM-DD' ),
          pageSize,
          pageIndex: page
        }
      });
    }
  };

  useEffect(() => {
    handleFetch()();
  }, [selected]);

  useEffect(() => {
    return () => dispatch({
      type: 'measure.update',
      payload: {
        pageIndex: 1,
        pageLimit: pageSize,
        listLoading: false
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      {show ? (
        <DateTimePicker
          mode="date"
          locale="zh-cn"
          display="default"
          value={new Date( selected.format( moment.HTML5_FMT.DATE ))}
          onChange={handleChange} />
      ) : null}
      <View style={[
        styles.pickerTrigger,
        {
          height: statusBarHeight + HEADER_LARGE_HEIGHT,
          backgroundColor: ThemeConstants[theme].backgroundColor,
          borderBottomColor: ThemeConstants[theme].borderTopColor,
          borderBottomWidth: 1
        }
      ]}>
        <View style={styles.triggerContent}>
          <TouchableOpacity activeOpacity={ACTIVE_OPACITY} onPress={handlePrev}>
            <Text style={styles.pickerDate}>前一天</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={ACTIVE_OPACITY} onPress={handleOpen}>
            <View style={styles.triggerContentText}>
              <Icon name="calendar" color="#047FFE" size={20}/>
              <Text style={styles.pickerDate}>{selected.format( 'YYYY-MM-DD' )}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={ACTIVE_OPACITY} onPress={handleNext}>
            <Text style={styles.pickerDate}>后一天</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Table
        data={list}
        headerData={vars}
        refreshing={pageIndex === 1 && listLoading}
        onRefresh={handleFetch()}
        onEndReached={handleFetch( pageIndex + 1 )}
        style={styles.scrollview} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  pickerTrigger: {
    justifyContent: 'flex-end'
  },
  triggerContent: {
    flex: 0,
    height: 44,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16
  },
  triggerContentText: {
    flexDirection: 'row'
  },
  pickerDate: {
    marginLeft: 4,
    color: '#047FFE',
    fontSize: 16
  },
  scrollview: {
    flex: 1,
    backgroundColor: '#F1F3FD'
  },
  listview: {
    flex: 1
  }
});

Block.navigationOptions = () => {
  return {
    title: '历史数据',
    headerTransparent: true,
    headerStyle: { zIndex: 2 }
  };
};

export default connect(({ measure }) => {
  return {
    listLoading: measure.listLoading,
    list: measure.history,
    vars: measure.historyVar,
    info: measure.info ? measure.info.originalData : null,
    pageIndex: measure.pageIndex,
    pageSize: measure.pageSize
  }
})( Block );
