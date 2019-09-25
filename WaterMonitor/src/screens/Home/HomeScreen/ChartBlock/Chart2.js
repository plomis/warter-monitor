
import React, { useRef, useEffect } from 'react';
import { Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import loadLocalResource from 'react-native-local-resource'
import f2Html from '../../../../assets/pages/f2.html';
import jstpl from '../../../../assets/pages/chart2.html';


function Chart({ data, height }) {

  const webViewRef = useRef( null );
  const source = Platform.OS === 'ios' ? f2Html : 'file:///android_asset/src/assets/pages/f2.html';
  const dataString = JSON.stringify( data.map(( itemData ) => ({
    name: itemData.subitemName,
    percent: itemData.percent,
    value: itemData.avgPeopleDosage,
    type: 'const'
  })));

  const handleLoad = () => {
    loadLocalResource( jstpl ).then(( jstpl ) => {
      webViewRef.current.injectJavaScript( jstpl );
      webViewRef.current.injectJavaScript( `chartApi.renderChart(${dataString});` );
    });
  };

  useEffect(() => {
    webViewRef.current.injectJavaScript( `chartApi.changeData(${dataString});` );
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
      style={{ flex: 1, height }}
      source={source}
      onLoad={handleLoad} />
  );
}

export default Chart;
