
import React, { useState } from 'react';
import { View, Animated, StyleSheet, RefreshControl, Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { HEADER_HEIGHT, HEADER_LARGE_HEIGHT } from '../constants';
import AnimatedHeader from './AnimatedHeader';
import AnimatedBackground from './AnimatedBackground';
import { Context } from './context';


function Screen({
  style,
  children,
  headerHeight,
  headerLeft,
  headerRight,
  onLeftPress,
  onRightPress,
  title
}) {

  const { height } = Dimensions.get( 'window' );
  const ANIMATION_RANGE = headerHeight - HEADER_HEIGHT;
  const [ state ] = useState({ scrollY: new Animated.Value( 0 ) });

  const headerRange = state.scrollY.interpolate({
    inputRange: [ -height, 0 ],
    outputRange: [ height, 0 ],
    extrapolate: 'clamp'
  });

  const animationRange = state.scrollY.interpolate({
    inputRange: [ 0, ANIMATION_RANGE ],
    outputRange: [ 0, 1 ],
    extrapolate: 'clamp'
  });

  const getAnimationRange = ( outputRange, rate = 1 ) => {
    return animationRange.interpolate({
      inputRange: [ 0, rate ],
      outputRange
    });
  }

  // safe area
  const statusBarHeight = getStatusBarHeight();

  return (
    <Context.Provider value={{
      statusBarHeight, ANIMATION_RANGE,
      getAnimationRange, HEADER_HEIGHT,
      HEADER_LARGE_HEIGHT, headerHeight
    }}>
      <View style={styles.container}>
        <Animated.ScrollView
          refreshControl={
            <RefreshControl tintColor="#fff" style={styles.refreshControl} refreshing={false} onRefresh={() => {}} />
          }
          style={[ styles.scrollView, style ]}
          onScroll={Animated.event([{
              nativeEvent: { contentOffset: { y: state.scrollY }},
            }], {
              useNativeDriver: true
            })}>
          <View style={[ styles.overflow, { height: 88, bottom: '100%' }]} />
          {children}
        </Animated.ScrollView>
        <AnimatedBackground height={headerHeight + statusBarHeight} />
        <AnimatedHeader
          headerRange={headerRange}
          onLeftPress={onLeftPress}
          onRightPress={onRightPress}
          title={title}
          left={headerLeft}
          right={headerRight} />
      </View>
    </Context.Provider>
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
  overflow: {
    left: 0,
    width: '100%',
    position: 'absolute',
    backgroundColor: '#667eff'
  },
  refreshControl: {
    zIndex: 1,
    backgroundColor: '#667eff'
  }
});


export default Screen;
