import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import { getImages } from '../../services/index';

import Carousel from './components/Carousel';

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
    <SafeAreaView style={style.container}>
      <StatusBar barStyle={'light-content'} />
      {isLoading && (
        <View style={style.loadingContainer}>
          <Text style={style.loading}>Loading...</Text>
        </View>
      )}
      {!isLoading && <Carousel images={images} />}
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#2E4053',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loading: {
    color: '#fff'
  }
});

export default CarouselScreen;
