import React from 'react';
import { Image, useWindowDimensions } from 'react-native';

export const CardImageFallback = (props) => {
  const window = useWindowDimensions();

  return (
    <Image
      style={[{
        width: window.width,
        height: window.width,
      }, props.style]}
      source={require('../../assets/foods/fallback.png')}
    />
  );
};
