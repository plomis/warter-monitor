
import moment from 'moment';
import React, { useRef, useEffect } from 'react';
import { Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import f2Html from '../../../assets/pages/f2.html';
import jst from '../../../assets/pages/chart1.jst';


function Chart({ data, type }) {

  const webViewRef = useRef( null );
  const [ loaded, setLoaded ] = useState( false );
  const source = Platform.OS === 'ios' ? f2Html : { uri: 'file:///android_asset/pages/f2.html?var=' + ( + new Date() ) };
  const dataString = JSON.stringify( data.map(( itemData ) => ({
    name: type === 'hour'
      ? `${moment( itemData.dayHour, 'YYYY-MM-DD HH' ).format( 'H' )}时`
      : type === 'day' ? `${moment( itemData.day, 'YYYY-MM-DD' ).format( 'D' )}日`
      : `${moment( itemData.yearMonth, 'YYYY-MM' ).format( 'M' )}月`,
    value: itemData.dosage
  })));

  // const handleLoad = () => {
  //   webViewRef.current.injectJavaScript( jst );
  //   webViewRef.current.injectJavaScript( `chartApi.renderChart(${dataString});` );
  // };

  const handleLoad = () => {
    setLoaded( true );
    webViewRef.current.injectJavaScript( `try{
      if ( chartApi ) {
        ${jst}
        chartApi.renderChart(${dataString});
      }
    } catch(e) {
      alert(e);
    }` );
  };

  useEffect(() => {
    if ( loaded ) {
      webViewRef.current.injectJavaScript( `chartApi.changeData(${dataString});` );
    }
  }, [data]);

  return (
    <WebView
      ref={webViewRef}
      incognito
      allowFileAccess
      scalesPageToFit
      javaScriptEnabled
      saveFormDataDisabled
      hideKeyboardAccessoryView
      startInLoadingState={false}
      cacheEnabled={false}
      domStorageEnabled={false}
      allowsLinkPreview={false}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      allowsBackForwardNavigationGestures={false}
      scrollEnabled={false}
      thirdPartyCookiesEnabled={false}
      overScrollMode="never"
      dataDetectorTypes="none"
      originWhitelist={['*']}
      style={{ flex: 1, height: 220 }}
      source={source}
      onLoad={handleLoad} />
  );
}

export default Chart;
