
import moment from 'moment';
import React, { useState, useContext, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, Button,
  Easing, TouchableWithoutFeedback, Picker } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { SegmentedControl, Icon } from '@ant-design/react-native';
import { NavigationEvents, ThemeContext } from 'react-navigation';
import WebView from 'react-native-webview';
import { ACTIVE_OPACITY, HEADER_HEIGHT, ThemeConstants, HOST } from '../../components/constants';
import { connect } from '../../utils/plodux';


const pickerHeight = 230;
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
  const statusBarHeight = getStatusBarHeight();
  const [ selected, setSelected ] = useState( moment().add( -1, 'month' ));
  const [ pickerValue, setPickerValue ] = useState( selected );
  const [ show, setShow ] = useState( false );
  const [ type, setType ] = useState( '月报' );
  const [ state ] = useState({ y: new Animated.Value( 0 ) });
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

  const pickerRange = state.y.interpolate({
    inputRange: [ 0, pickerHeight ],
    outputRange: [ 0, 1 ],
    extrapolate: 'clamp'
  });

  const triggerRange = pickerRange.interpolate({
    inputRange: [ 0, 1 ],
    outputRange: [ 0, -44 ]
  });

  const triggerOpacityRange = pickerRange.interpolate({
    inputRange: [ 0, 0.6 ],
    outputRange: [ 1, 0 ]
  });

  const pickerOpacityRange = pickerRange.interpolate({
    inputRange: [ 0.2, 1 ],
    outputRange: [ 0, 1 ]
  });

  const maskRange = pickerRange.interpolate({
    inputRange: [ 0.5, 1 ],
    outputRange: [ 0, 1 ]
  });

  const handleChange = ( date ) => {
    setPickerValue( moment( date, type === '月报' ? 'YYYY年MM月' : 'YYYY年' ));
  };

  const handleOpen = () => {
    if ( !show ) {
      setShow( true );
      Animated.timing(
        state.y,
        {
          duration: 400,
          toValue: pickerHeight,
          easing: Easing.inOut( Easing.quad ),
          useNativeDriver: true
        }
      ).start();
    }
  };

  const handleClose = () => {
    Animated.timing(
      state.y,
      {
        toValue: 0,
        duration: 300,
        easing: Easing.inOut( Easing.quad ),
        useNativeDriver: true
      }
    ).start(() => {
      setShow( false );
      setPickerValue( selected );
    });
  };

  const handleSubmit = () => {
    Animated.timing(
      state.y,
      {
        toValue: 0,
        duration: 300,
        easing: Easing.inOut( Easing.quad ),
        useNativeDriver: true
      }
    ).start(() => {
      setShow( false );
      setSelected( pickerValue );
      webViewRef.current.injectJavaScript( injectedJavaScript( type, pickerValue ));
    });
  };

  const handleTypeChange = ( value ) => {
    const date = moment().add( -1, value === '月报' ? 'month' : 'year' );
    setType( value );
    setSelected( date );
    setPickerValue( date );
    webViewRef.current.injectJavaScript( injectedJavaScript( value, date ));
  };

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={handleWillFocus} />
      <WebView
        style={[
          styles.webview,
          { marginTop: statusBarHeight + HEADER_HEIGHT }
        ]}
        ref={webViewRef}
        zoomable={false}
        source={{ uri }}
        dataDetectorTypes="none"
        hideKeyboardAccessoryView
        applicationNameForUserAgent="Thingspower/1.0.0" />
      {show ? (
        <TouchableWithoutFeedback onPress={handleClose}>
          <Animated.View style={[ styles.mask, { opacity: maskRange }]} />
        </TouchableWithoutFeedback>
      ) : null}
      <Animated.View style={[
        styles.pickerContainer,
        {
          top: -pickerHeight,
          height: statusBarHeight + HEADER_HEIGHT + pickerHeight,
          backgroundColor: ThemeConstants[theme].backgroundColor,
          borderBottomColor: ThemeConstants[theme].borderTopColor,
          borderBottomWidth: 1,
          transform: [{
            translateY: state.y
          }]
        }
      ]}>
        {show ? (
          <Animated.View style={{ flex: 1, justifyContent: 'flex-end', opacity: pickerOpacityRange }}>
              <Picker
                selectedValue={pickerValue.format( type === '月报' ? 'YYYY年MM月' : 'YYYY年' )}
                onValueChange={handleChange}>
                {makePickerItems( type === '月报' ? 'month' : 'year', type === '月报' ? 'YYYY年MM月' : 'YYYY年' )}
              </Picker>
              <View style={styles.pickerController}>
                <Button
                  onPress={handleClose}
                  title="取消" />
                <Button
                  onPress={handleSubmit}
                  title="确定" />
              </View>
            </Animated.View>
          ) : null}
      </Animated.View>
      <View style={[
        styles.pickerTrigger,
        {
          height: statusBarHeight + HEADER_HEIGHT
        }
      ]}>
        <Animated.View style={[
          styles.triggerContent,
          {
            height: HEADER_HEIGHT,
            opacity: triggerOpacityRange,
            transform: [{
              translateY: triggerRange
            }]
          }
        ]}>
          <SegmentedControl
            style={styles.segment}
            values={[ '月报', '年报' ]}
            tintColor="#047FFE"
            onValueChange={handleTypeChange} />
          <TouchableOpacity activeOpacity={ACTIVE_OPACITY} onPress={handleOpen}>
            <View style={styles.triggerContentText}>
              <Icon name="calendar" color="#047FFE" size={20}/>
              <Text style={styles.pickerDate}>{selected.format( type === '月报' ? 'YYYY年MM月' : 'YYYY年' )}</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  pickerContainer: {
    flex: 0,
    justifyContent: 'flex-end',
    top: 0,
    left: 0,
    width: '100%',
    position: 'absolute',
    zIndex: 2
  },
  pickerTrigger: {
    flex: 0,
    top: 0,
    left: 0,
    width: '100%',
    position: 'absolute',
    zIndex: 3,
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
  pickerController: {
    height: 44,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  pickerDate: {
    marginLeft: 4,
    color: '#047FFE',
    fontSize: 16
  },
  webview: {
    flex: 1,
    zIndex: 1,
    backgroundColor: '#F1F3FD'
  },
  mask: {
    top: 0,
    left: 0,
    flex: 0,
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.2)',
    zIndex: 1,
    opacity: 0
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
