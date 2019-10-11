
import React, { useRef, useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import f2Html from '../../../../assets/pages/f2.html';
import jst from '../../../../assets/pages/chart2.jst';


function Chart({ data, height }) {

  const webViewRef = useRef( null );
  const [ loaded, setLoaded ] = useState( false );
  const source = Platform.OS === 'ios' ? f2Html : { uri: 'file:///android_asset/pages/f2.html?var=' + ( + new Date() ) };
  const dataString = JSON.stringify( data.map(( itemData ) => ({
    name: itemData.subitemName,
    percent: itemData.percent,
    value: itemData.avgPeopleDosage,
    type: 'const'
  })));

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

  // RNFS.readDir( RNFS.MainBundlePath )
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
      style={{ flex: 0, height }}
      source={source}
      onLoad={handleLoad} />
  );
}

export default Chart;
