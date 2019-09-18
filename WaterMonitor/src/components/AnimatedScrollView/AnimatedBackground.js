
import React, { useContext } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { Context } from './context';

const HeaderBackground = ({ height }) => {

  // const theme = useContext( ThemeContext );
  const { HEADER_HEIGHT, getAnimationRange, headerHeight } = useContext( Context );
  const animateHeader = {
    transform: [{
      translateY: getAnimationRange([ 0, HEADER_HEIGHT - headerHeight ])
    }],
    opacity: getAnimationRange([ 0, 1 ])
  };

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.headerBackground,
        animateHeader,
        {
          height//: height - 1,
          // borderBottomColor: ThemeConstants[theme].borderTopColor,
          // backgroundColor: ThemeConstants[theme].backgroundColor
        }
      ]} />
  );
};

const styles = StyleSheet.create({
  headerBackground: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#6667ff', // '#F1F3FD',
    // borderBottomWidth: 1,
    // borderStyle: 'solid',
    zIndex: 1
  }
});

export default HeaderBackground;
