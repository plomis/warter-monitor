
import React from 'react';
import { Animated } from 'react-native';


const Container = ({ style, headerRange, children }) => {

  const animateStyle = {
    transform: [{
      translateY: headerRange
    }]
  };

  style.push( animateStyle );

  return (
    <Animated.View style={style}>
      {children}
    </Animated.View>
  );
};

export default Container;
