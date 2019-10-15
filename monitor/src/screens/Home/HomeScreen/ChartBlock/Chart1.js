
import moment from 'moment';
import React, { useRef, useState, useEffect } from 'react';
import { Platform, View } from 'react-native';
import { WebView } from 'react-native-webview';
import f2Html from '../../../../assets/pages/f2.html';
import jst from '../../../../assets/pages/chart1.jst';


function Chart({ data, type }) {

  const viewRef = useRef( null );
  const webViewRef = useRef( null );
  const [ timestemp ] = useState( + new Date());
  const [ loaded, setLoaded ] = useState( false );
  const source = Platform.OS === 'ios' ? f2Html : { uri: 'file:///android_asset/pages/f2.html?var=' + timestemp };
  const dataString = JSON.stringify( data.map(( itemData ) => ({
    name: type === 'hour'
      ? `${moment( itemData.dayHour, 'YYYY-MM-DD HH' ).format( 'H' )}时`
      : type === 'day' ? `${moment( itemData.day, 'YYYY-MM-DD' ).format( 'D' )}日`
      : `${moment( itemData.yearMonth, 'YYYY-MM' ).format( 'M' )}月`,
    value: itemData.dosage
  })));

  const handleLoad = () => {
    viewRef.current.measure(( x_, y_, widht, height, left_, top_ ) => {
      setLoaded( true );
      webViewRef.current.injectJavaScript( `try{
        if ( window.chartApi ) {
          ${jst}
          chartApi.renderChart(${dataString});
          chartApi.changeSize(${widht}, ${height});
        }
      } catch(e) {
        alert(e);
      }` );
    });
  };

  useEffect(() => {
    if ( loaded ) {
      webViewRef.current.injectJavaScript( `chartApi.changeData(${dataString});` );
    }
  }, [data]);

  return (
    <View ref={viewRef} style={{ borderWidth: 1, borderColor: 'transparent' }}>
      <WebView
        ref={webViewRef}
        allowFileAccess
        scalesPageToFit
        javaScriptEnabled
        saveFormDataDisabled
        hideKeyboardAccessoryView
        allowsBackForwardNavigationGestures
        startInLoadingState={false}
        cacheEnabled={false}
        domStorageEnabled={false}
        allowsLinkPreview={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        thirdPartyCookiesEnabled={false}
        overScrollMode="never"
        dataDetectorTypes="none"
        originWhitelist={['*']}
        style={{ flex: 1, height: 220 }}
        source={source}
        onLoad={handleLoad} />
    </View>
  );
}

export default Chart;
