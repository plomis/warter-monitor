
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Icon from 'react-native-vector-icons/Ionicons';
import AnimatedScrollView from '../../../components/AnimatedScrollView';
import { connect } from '../../../utils/plodux';
import Banner from './Banner';
import IndexBlock from './IndexBlock';
import ChartBlock from './ChartBlock';


const BANNER_HEIGHT = 400;

function Screen({ dispatch }) {

  const statusBarHeight = getStatusBarHeight();
  const title = '总览';
  const handleDidFocus = () => {
    dispatch({
      type: 'statusBar.update',
      payload: {
        barStyle: 'light-content'
      }
    });
  };

  const layout = ( event ) => {
    console.log(event);

  };

  return (
    <View style={styles.container}>
      <NavigationEvents onDidFocus={handleDidFocus} />
      <AnimatedScrollView
        title={title}
        onLayout={layout}
        headerLeft={<Icon name="ios-apps" color="#fff" size={28} />}
        headerRight={<Icon name="ios-apps" color="#fff" size={28} />}
        onLeftPress={() => {console.log('left')}}
        onRightPress={() => {console.log('right')}}
        style={styles.scrollView}
        headerHeight={BANNER_HEIGHT}>
        <Banner statusBarHeight={statusBarHeight} bannerHeight={BANNER_HEIGHT} />
        <IndexBlock data={{ 'a': 29.90, 'b': 29.90, 'c': 29.90, 'd': 29.90, 'e': 29.90, 'f': 29.90 }} />
        <ChartBlock />
      </AnimatedScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    flex: 1
  }
});


export default connect()( Screen );
