import React from 'react';
import {
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const CarouselItem = ({ item }) => {
  return (
    <Image
      source={{ uri: item.image }}
      style={style.image}
    />
  );
};

const style = StyleSheet.create({
  image: {
    width: width,
    height: 250,
    resizeMode: 'stretch'
  }
});

export default CarouselItem;
