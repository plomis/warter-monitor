
import moment from 'moment';
import React, { useState, useContext, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Picker } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { SegmentedControl, Icon } from '@ant-design/react-native';
import { NavigationEvents, ThemeContext } from 'react-navigation';
import WebView from 'react-native-webview';
import { ACTIVE_OPACITY, HEADER_HEIGHT, ThemeConstants } from '../../components/constants';
import { connect } from '../../utils/plodux';


const basename = 'http://218.90.26.31:8082/water/monitor/app';
const makePickerItems = ( type, format ) => {
  const clone = moment().add( -50, type );
  return Array( 50 ).fill( 1 ).map(( _, index ) => {
    const date = clone.add( 1, type ).format( format );
    return <Picker.Item key={date} label={date} value={date} />;
  });
}

function Screen({ dispatch }) {

  const webViewRef = useRef( null );
  const theme = useContext( ThemeContext );
  const statusBarHeight = getStatusBarHeight();
  const [ selected, setSelected ] = useState( moment().add( -1, 'month' ));
  const [ type, setType ] = useState( '月报' );

  const handleWillFocus = () => {
    dispatch({
      type: 'statusBar.update',
      payload: {
        barStyle: 'dark-content'
      }
    });
  };

  const handleChange = ( date ) => {
    setSelected( moment( date, type === '月报' ? 'YYYY年MM月' : 'YYYY年' ));
    webViewRef.current.injectJavaScript( `(function() {
      if ( window.$changeReportPage ) {
        window.$changeReportPage(
          ${type === '月报' ? 'month' : 'year'},
          ${type === '月报' ? selected.format( 'YYYY-MM' ) : selected.format( 'YYYY' )}
        );
      }
    })();` );
  };

  const handleTypeChange = ( value ) => {
    setType( value );
    if ( value === '月报' ) {
      setSelected( moment().add( -1, 'month' ));
    } else {
      setSelected( moment().add( -1, 'year' ));
    }
    webViewRef.current.injectJavaScript( `(function() {
      if ( window.$changeReportPage ) {
        window.$changeReportPage(
          ${value === '月报' ? 'month' : 'year'},
          ${value === '月报' ? selected.format( 'YYYY年MM月' ) : selected.format( 'YYYY年' )}
        );
      }
    })();` );
  };

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={handleWillFocus} />
      <View style={[
        styles.pickerTrigger,
        {
          height: statusBarHeight + HEADER_HEIGHT
        }
      ]}>
        <View style={[
          styles.triggerContent,
          {
            height: HEADER_HEIGHT,
            backgroundColor: ThemeConstants[theme].backgroundColor,
            borderBottomColor: ThemeConstants[theme].borderTopColor,
            borderBottomWidth: 1
          }
        ]}>
          <SegmentedControl
            style={styles.segment}
            values={[ '月报', '年报' ]}
            tintColor="#047FFE"
            onValueChange={handleTypeChange} />
          <View style={styles.triggerContentText}>
            <Icon name="calendar" size={20}/>
            <View style={{ width: type === '月报' ? 150 : 120 }}>
              <Picker
                style={{ borderWidth: 1, flexWrap: 'nowrap' }}
                selectedValue={selected.format( type === '月报' ? 'YYYY年MM月' : 'YYYY年' )}
                onValueChange={handleChange}>
                {makePickerItems( type === '月报' ? 'month' : 'year', type === '月报' ? 'YYYY年MM月' : 'YYYY年' )}
              </Picker>
            </View>
          </View>
        </View>
      </View>
      <WebView
        style={styles.webview}
        ref={webViewRef}
        zoomable={false}
        source={{ uri: `${basename}/report?ajaxKeyIndex=${
          type === '月报' ? `0&yearMonth=${selected.format( 'YYYY-MM' )}` : `1&year=${selected.format( 'YYYY' )}`
        }`}}
        dataDetectorTypes="none"
        incognito
        hideKeyboardAccessoryView
        applicationNameForUserAgent="Thingspower/1.0.0" />
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
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16
  },
  triggerContentText: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row'
  },
  pickerDate: {
    marginLeft: 4,
    color: '#047FFE',
    fontSize: 16
  },
  webview: {
    flex: 1,
    backgroundColor: '#F1F3FD'
  },
  listview: {
    flex: 1
  },
  segment: {
    width: 120
  }
});


export default connect()( Screen );
