
import React from 'react';
import { Animated } from 'react-native';


const AnimatedView = ({
  getAnimationRange,
  children,
  style
}) => {

  const animateStyle = {
    transform: [{
      scale: getAnimationRange([ 1, 0.9 ])
    }]
  };

  return (
    <Animated.View style={[ style, animateStyle ]}>
      {children}
    </Animated.View>
  )
}

export default AnimatedView;
