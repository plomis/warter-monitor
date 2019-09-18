
import React from 'react';
import { StyleSheet, Animated } from 'react-native';


const AnimatedText = ({
  getAnimationRange,
  children,
  range
}) => {

  const animateStyle = {
    transform: [{
      translateY: getAnimationRange([ 1, range ])
    }, {
      scale: getAnimationRange([ 1, 0.8 ])
    }]
  };

  return (
    <Animated.Text
      style={[ styles.text, animateStyle ]}>
      {children}
    </Animated.Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold'
  }
});

export default AnimatedText;
