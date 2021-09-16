import React from 'react';
import {
  Image,
  Dimensions,
} from 'react-native';

import { carouselItemStyle } from '../styles/index';

const { width } = Dimensions.get('window');

const CarouselItem = ({ item }) => {
  return (
    <Image
      source={{ uri: item.image }}
      style={carouselItemStyle.image}
    />
  );
};

export default CarouselItem;
