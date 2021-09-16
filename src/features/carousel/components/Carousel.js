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
  const [location, setLocation] = useState({x: 0, y: 0});

  useEffect(() => {
    console.log('location', location);
    // TODO
    console.log('width', width * activeImage );
  }, [location]);

  const handleChangeActiveImage = (e) => {
    const slide = Math.ceil(e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width);
    if (slide !== activeImage) {
      setActiveImage(slide);
    }
    setLocation({x: e.nativeEvent.contentOffset.x, y: e.nativeEvent.contentOffset.y});
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
        contentOffset={location}
      >
          {images.map((image, i) => <CarouselItem key={`image_${i}`} item={image} width={width} height={height} />)}
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
});

export default Carousel;
