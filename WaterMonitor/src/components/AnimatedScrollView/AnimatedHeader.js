
import React, { useContext, Fragment } from 'react';
import { StyleSheet, View, Animated, TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { ACTIVE_OPACITY } from '../constants';
import AnimatedContainer from './AnimatedContainer';
import AnimatedText from './AnimatedText';
import AnimatedView from './AnimatedView';
import { Context } from './context';


const HeaderButton = ({ onPress, children }) => {
  return (
    <TouchableOpacity activeOpacity={ACTIVE_OPACITY} onPress={onPress}>
      <View style={styles.hearderButton}>
        {children}
      </View>
    </TouchableOpacity>
  );
}


const AnimatedHeader = ({ headerRange, left, right, onRightPress, onLeftPress, title }) => {

  const { statusBarHeight, HEADER_LARGE_HEIGHT, HEADER_HEIGHT, getAnimationRange } = useContext( Context );
  const containerStyle = {
    height: HEADER_LARGE_HEIGHT,
    top: getStatusBarHeight()
  };

  return (
    <AnimatedContainer
      headerRange={headerRange}
      style={[ styles.wrap, { height: statusBarHeight + HEADER_HEIGHT }]}>
      <View style={[ styles.container, containerStyle ]} pointerEvents="none">
        <AnimatedText
          getAnimationRange={getAnimationRange}
          range={( HEADER_HEIGHT - HEADER_LARGE_HEIGHT ) / 2}
          pointerEvents="none">
          {title}
        </AnimatedText>
      </View>
      <AnimatedView
        style={[ styles.headerLeft, { top: statusBarHeight + 8 }]}
        getAnimationRange={getAnimationRange}>
        <HeaderButton onPress={onLeftPress}>
          {left}
        </HeaderButton>
      </AnimatedView>
      <AnimatedView
        style={[ styles.headerRight, { top: statusBarHeight + 8 }]}
        getAnimationRange={getAnimationRange}>
        <HeaderButton onPress={onRightPress}>
          {right}
        </HeaderButton>
      </AnimatedView>
    </AnimatedContainer>
  );
}


const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    zIndex: 2,
    width: '100%'
  },
  container: {
    position: 'absolute',
    zIndex: 2,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerBackground: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#6667ff', // '#F1F3FD',
    // borderBottomWidth: 1,
    // borderStyle: 'solid',
    zIndex: 1
  },
  headerLeft: {
    alignItems: 'flex-start',
    height: 28,
    position: 'absolute',
    left: 16,
    top: 8,
    zIndex: 2
  },
  headerRight: {
    alignItems: 'flex-end',
    height: 28,
    position: 'absolute',
    right: 16,
    top: 8,
    zIndex: 2
  },
  hearderButton: {
    height: 28,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default AnimatedHeader;
