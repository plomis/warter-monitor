
import React, { useRef, useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import f2Html from '../../../../assets/pages/f2.html';
import jst from '../../../../assets/pages/chart2.jst';


function Chart({ data, height }) {

  const webViewRef = useRef( null );
  const [ timestemp ] = useState( + new Date());
  const [ loaded, setLoaded ] = useState( false );
  const source = Platform.OS === 'ios' ? f2Html : { uri: 'file:///android_asset/pages/f2.html?var=' + timestemp };
  const dataString = JSON.stringify( data.map(( itemData ) => ({
    name: itemData.subitemName,
    percent: itemData.percent,
    value: itemData.avgPeopleDosage,
    type: 'const'
  })));

  const handleLoad = () => {
    setLoaded( true );
    webViewRef.current.injectJavaScript( `try{
      if ( window.chartApi ) {
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
      style={{ flex: 0, height }}
      source={source}
      onLoad={handleLoad} />
  );
}

export default Chart;
