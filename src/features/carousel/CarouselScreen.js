import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  StatusBar,
} from 'react-native';

const CarouselScreen = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
   console.log('maro')
  }, [])

  return (
    <SafeAreaView style={style.container}>
      <StatusBar barStyle={'light-content'} />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#2E4053',
  },
});

export default CarouselScreen;
