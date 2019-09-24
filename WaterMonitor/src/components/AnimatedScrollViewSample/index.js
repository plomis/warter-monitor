
import React, { useState } from 'react';
import { View, Animated, StyleSheet, RefreshControl } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { HEADER_HEIGHT } from '../constants';


function Screen({
  style,
  children,
  range
}) {

  const [ state ] = useState({ scrollY: new Animated.Value( 0 ) });

  const animationRange = state.scrollY.interpolate({
    inputRange: [ 0, range || 100 ],
    outputRange: [ 0, 1 ],
    extrapolate: 'clamp'
  });

  const statusBarHeight = getStatusBarHeight();

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={() => {}} />
        }
        style={[ styles.scrollView, style ]}
        onScroll={Animated.event([{
          nativeEvent: { contentOffset: { y: state.scrollY }},
        }], {
          useNativeDriver: true
        })}>
        <View style={{ height: statusBarHeight + HEADER_HEIGHT }} />
        {children}
      </Animated.ScrollView>
      <Animated.View style={[
        styles.headerBackground,
        { height: statusBarHeight + HEADER_HEIGHT, opacity: animationRange }
      ]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#F1F3FD'
  },
  headerBackground: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#fff',
    zIndex: 1
  }
});


export default Screen;
