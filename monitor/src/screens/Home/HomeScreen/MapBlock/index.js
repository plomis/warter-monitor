
import React from 'react';
import moment from 'moment';
import { WebView } from 'react-native-webview';
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import { HOST } from '../../../../components/constants';
import Tabs from '../../../../components/Tabs';


const basename = `${HOST}/water/monitor`;
const beginDate = moment().format( 'YYYY-MM-DD' );
const endDate = moment().format( 'YYYY-MM-DD' );

function Block({ data, navigation }) {

  const tabs = data ? data.map(({ balanceName }) => {
    return {
      title: balanceName
    };
  }) : []

  const handleInfo = ( url ) => () => {
    navigation.navigate( 'BalanceInfo', { url });
  };

  return (
    <View>
      <Text style={styles.title}>计量图谱</Text>
      {data ? (
        <Tabs tabs={tabs}>
          {data.map(({ balanceId }) => {
            const url = `/?balanceId=${balanceId}&beginDate=${beginDate}&endDate=${endDate}`;
            return (
              <View key={`${balanceId}`} style={styles.tabItem}>
                <WebView
                  zoomable={false}
                  allowFileAccess
                  scalesPageToFit
                  javaScriptEnabled
                  saveFormDataDisabled
                  hideKeyboardAccessoryView
                  allowsBackForwardNavigationGestures
                  scrollEnabled={false}
                  thirdPartyCookiesEnabled={false}
                  overScrollMode="never"
                  dataDetectorTypes="none"
                  startInLoadingState={false}
                  cacheEnabled={false}
                  domStorageEnabled={false}
                  allowsLinkPreview={false}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  applicationNameForUserAgent="Thingspower/1.0.0"
                  source={{ uri: basename + url }}
                  style={styles.webview}
                  originWhitelist={['*']} />
                <TouchableWithoutFeedback onPress={handleInfo( url )}>
                  <View style={styles.mask} />
                </TouchableWithoutFeedback>
              </View>
            );
          })}
        </Tabs>
      ) : (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>暂无数据</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    padding: 8,
    backgroundColor: '#fff'
  },
  empty: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  emptyText: {
    color: 'rgba(0,0,0,0.6)',
    fontSize: 14
  },
  title: {
    height: 64,
    paddingTop: 32,
    textAlign: 'center',
    color: '#585E6F',
    fontSize: 20
  },
  webview: {
    height: 200
  },
  mask: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1
  }
});

export default Block;
