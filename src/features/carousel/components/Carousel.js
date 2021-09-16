import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';

import CarouselItem from './CarouselItem';

const { width } = Dimensions.get('window');
const height = width * 100 / 50;

const Carousel = ({ images }) => {
  const [activeImage, setActiveImage] = useState(0);

  const handleChangeActiveImage = (e) => {
    const slide = Math.ceil(e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width);
    if (slide !== activeImage) {
      setActiveImage(slide);
    }
  }

  return (
    <View style={{ width, height, alignItems: 'center' }}>
      <ScrollView 
        pagingEnabled
        horizontal
        scrollEventThrottle={1}
        onScroll={handleChangeActiveImage}
        showsHorizontalScrollIndicator={false}
        style={{ width, height}}
      >
          {images.map((image, i) => <CarouselItem key={`image_${i}`} item={image} width={width} height={height} />)}
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
});

export default Carousel;
