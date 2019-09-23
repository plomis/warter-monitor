
import React from 'react';
import { NavigationEvents } from 'react-navigation';
import { SafeAreaView, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview';
import { connect } from '../../utils/plodux';


function Screen({ dispatch }) {

  const handleDidFocus = () => {
    dispatch({
      type: 'statusBar.update',
      payload: {
        barStyle: 'dark-content'
      }
    });
  };

  const injectedJavascript = `

  `;

  return (
    <SafeAreaView style={styles.container}>
      <NavigationEvents onDidFocus={handleDidFocus} />
      <ScrollView
        style={styles.scrollview}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={() => {}} />
        }>
        <AutoHeightWebView
          // customStyle={heightStyle}
          // onError={onError}
          // onLoad={onLoad}
          // onLoadStart={onHeightLoadStart}
          // onLoadEnd={onHeightLoadEnd}
          // onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
          zoomable={false}
          source={{ html: '<body style="height:1000px;background-color:#444">loading</body>' }}
          customScript={injectedJavascript}
          // onMessage={onMessage}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollview: {
    flex: 1
  }
});

export default connect()( Screen );
