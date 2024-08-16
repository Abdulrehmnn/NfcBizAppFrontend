import React from 'react';
import { Image } from 'react-native';

const Logo = ({ source, style }) => {
  return (
    <Image
      source={source}
      style={style}
    />
  );
};

export default Logo;
