
import React, { useState, useContext } from 'react';
import { View, Animated, StyleSheet, RefreshControl } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { ThemeContext } from 'react-navigation';
import { HEADER_HEIGHT, ThemeConstants } from '../constants';


function Screen({
  style,
  children,
  refreshing,
  onRefresh,
  range
}) {

  const theme = useContext( ThemeContext );
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
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
        {
          height: statusBarHeight + HEADER_HEIGHT,
          backgroundColor: ThemeConstants[theme].backgroundColor,
          borderBottomColor: ThemeConstants[theme].borderTopColor,
          opacity: animationRange,
          borderBottomWidth: 1
        }
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
    zIndex: 1
  }
});


export default Screen;
