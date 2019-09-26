
import React from 'react';
import { NavigationEvents } from 'react-navigation';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from '../../utils/plodux';


function Info({ dispatch, navigation }) {

  const url = navigation.getParam( 'url' );
  const webViewRef = useRef( null );
  const [ refresh, setRefresh ] = useState( false );

  const handleWillFocus = () => {
    dispatch({
      type: 'statusBar.update',
      payload: {
        barStyle: 'dark-content'
      }
    });
  };

  const handleRefresh = () => {
    setRefresh( true );
    webViewRef.current.reload();
  };

  const handleLoad = () => {
    setRefresh( false );
  };

  const handleMessage = ( event ) => {
    const data = JSON.stringify( event.nativeEvent.data );

    // webViewRef.current.injectJavaScript(`(function() {
    //   window.geToPage(  );
    // })()`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavigationEvents onWillFocus={handleWillFocus} />
      <ScrollView
        style={styles.scrollview}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={handleRefresh} />
        }>
        <AutoHeightWebView
          ref={webViewRef}
          zoomable={false}
          onLoad={handleLoad}
          source={{ uri: url }}
          onMessage={handleMessage} />
      </ScrollView>
    </SafeAreaView>
  );
}

Info.navigationOptions = ({ navigation }) => {
  const title = navigation.getParam( 'title' );
  return {
    title,
    headerRight: <Text>分享</Text>
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollview: {
    flex: 1
  }
});


export default connect()( Info );
