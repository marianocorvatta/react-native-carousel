import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Dimensions,
  Pressable,
  Text,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';

import CarouselItem from './CarouselItem';
import { carouselStyle } from '../styles/index';

const { width } = Dimensions.get('window');
const height = width * 100 / 50;

const Carousel = ({ images }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [location, setLocation] = useState(null);
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (location) {
      saveLastImage();
    }
  }, [location]);

  useEffect(() => {
    if (!init) {
      getLastImage();
    }
  }, [init]);

  const getLastImage = async () => {
    setInit(true);
    const lasLocation = await SecureStore.getItemAsync('lastImage');
    if (lasLocation) {
      setLocation(JSON.parse(lasLocation));
    }
  }

  const saveLastImage = async () => {
    await SecureStore.setItemAsync('lastImage', JSON.stringify(location));
  }

  const handleChangeActiveImage = (e) => {
    const slide = Math.ceil(e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width);
    if (slide !== activeImage) {
      setActiveImage(slide);
    }
    setLocation({x: e.nativeEvent.contentOffset.x, y: e.nativeEvent.contentOffset.y});
  };

  const handleNext = () => {
    setLocation({x: width * (activeImage + 1), y: 0});
    setActiveImage(activeImage + 1);
  };

  const handlePrev = () => {
    setLocation({x: width * (activeImage - 1), y: 0});
    setActiveImage(activeImage - 1);
  };

  return (
    <View style={carouselStyle.container}>

      <ScrollView
        pagingEnabled
        horizontal
        scrollEventThrottle={1}
        onScroll={handleChangeActiveImage}
        showsHorizontalScrollIndicator={false}
        style={carouselStyle.scroll}
        contentOffset={location}
      >
        {images.map((image, i) => <CarouselItem key={`image_${i}`} item={image} />)}
      </ScrollView>

      <View style={carouselStyle.btnContainer}>
        <Pressable
          disabled={activeImage === 0}
          onPress={handlePrev}
        >
          <View style={activeImage === 0 ? carouselStyle.btnDisabled : carouselStyle.prevBtn}>
            <Text style={carouselStyle.btnText}>Prev</Text>
          </View>
        </Pressable>

        <Pressable
          disabled={activeImage + 1 === images.length}
          onPress={handleNext}
        >
          <View style={activeImage + 1 === images.length ? carouselStyle.btnDisabled : carouselStyle.nextBtn}>
            <Text style={carouselStyle.btnText}>Next</Text>
          </View>
        </Pressable>
      </View>

    </View>
  );
};

export default Carousel;
