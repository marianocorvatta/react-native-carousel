import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  Image,
} from 'react-native';

const CarouselItem = ({ item, width, height }) => {
  return (
    <Image
      source={{ uri: item.image }}
      style={{ width, height, resizeMode: 'contain' }}
    />
  );
};

const styles = StyleSheet.create({
  carouselItem: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    marginHorizontal: 24,
    width: '1000%'
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain'
  },
});

export default CarouselItem;
