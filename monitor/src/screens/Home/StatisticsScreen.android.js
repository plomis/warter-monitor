
import moment from 'moment';
import React, { useState, useContext, useRef } from 'react';
import { StyleSheet, View, Picker } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { SegmentedControl, Icon, ActivityIndicator } from '@ant-design/react-native';
import { NavigationEvents, ThemeContext } from 'react-navigation';
import WebView from 'react-native-webview';
import { HOST, HEADER_HEIGHT, ThemeConstants } from '../../components/constants';
import { connect } from '../../utils/plodux';


const basename = `${HOST}/water/monitor/app`;
const makePickerItems = ( type, format ) => {
  const clone = moment().add( -50, type );
  return Array( 50 ).fill( 1 ).map(( _, index ) => {
    const date = clone.add( 1, type ).format( format );
    return <Picker.Item key={date} label={date} value={date} />;
  });
}

function Screen({ dispatch, accessToken }) {

  const webViewRef = useRef( null );
  const theme = useContext( ThemeContext );
  const [ loading, setLoading ] = useState( true );
  const statusBarHeight = getStatusBarHeight();
  const [ selected, setSelected ] = useState( moment().add( -1, 'month' ));
  const [ type, setType ] = useState( '月报' );
  const [ uri ] = useState( `${basename}/report?ajaxKeyIndex=${
    type === '月报' ? `0&yearMonth=${selected.format( 'YYYY-MM' )}` : `1&year=${selected.format( 'YYYY' )}`
  }&token=${encodeURIComponent( accessToken )}` );

  const injectedJavaScript = ( type, selected ) => `(function() {
    try{
      if ( window.$changeReportParams ) {
        window.$changeReportParams({
          ajaxKeyIndex: ${type === '月报' ? '0' : '1'},
          ${type === '月报' ? 'yearMonth' : 'year'}: '${type === '月报' ? selected.format( 'YYYY-MM' ) : selected.format( 'YYYY' )}'
        });
      }
    } catch( e ) {
      alert( e )
    }
  })();`;

  const handleWillFocus = () => {
    dispatch({
      type: 'statusBar.update',
      payload: {
        barStyle: 'dark-content'
      }
    });
  };

  handleLoad = () => {
    setLoading( false );
  };

  const handleChange = ( date ) => {
    const dateObj = moment( date, type === '月报' ? 'YYYY年MM月' : 'YYYY年' );
    setSelected( dateObj );
    webViewRef.current.injectJavaScript( injectedJavaScript( type, dateObj ));
  };

  const handleTypeChange = ( value ) => {
    const date = moment().add( -1, value === '月报' ? 'month' : 'year' );
    setType( value );
    setSelected( date );
    webViewRef.current.injectJavaScript( injectedJavaScript( value, date ));
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
        source={{ uri }}
        dataDetectorTypes="none"
        onLoad={handleLoad}
        hideKeyboardAccessoryView
        applicationNameForUserAgent="Thingspower/1.0.0" />
      {loading ? <ActivityIndicator toast text="正在加载" /> : null}
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


export default connect(({ global }) => {
  return {
    accessToken: global.accessToken
  };
})( Screen );
