import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import { getImages } from '../../services/index';

import Carousel from './components/Carousel';
import { carouselScreenStyle } from './styles/index';

const CarouselScreen = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let componentMounted = true;

  useEffect(() => {
    getImageList();
    return () => {
      componentMounted = false;
    };
  }, []);

  const getImageList = async () => {
    getImages()
      .then((resp) => {
        if (componentMounted) {
          setImages(resp);
        }
      })
      .catch(e => console.log(e))
      .finally(() => setIsLoading(false));
  };

  return (
    <SafeAreaView style={carouselScreenStyle.container}>
      <StatusBar barStyle={'light-content'} />
      {isLoading && (
        <View style={carouselScreenStyle.loadingContainer}>
          <Text style={carouselScreenStyle.loading}>Loading...</Text>
        </View>
      )}
      {!isLoading && <Carousel images={images} />}
    </SafeAreaView>
  );
};

export default CarouselScreen;
