
import React from 'react';
import SvgUri from 'react-native-svg-uri';


function Icon({ name, color, size, style }) {
  return (
    <SvgUri
      style={style}
      width={size}
      height={size}
      svgXmlData={name}
      fill={color}
      fillAll />
  );
}

export default Icon;
