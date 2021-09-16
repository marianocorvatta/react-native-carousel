import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  Pressable,
  Text,
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
    console.log('activeImage', activeImage );
  }, [location]);

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
    <View style={style.container}>

      <ScrollView
        pagingEnabled
        horizontal
        scrollEventThrottle={1}
        onScroll={handleChangeActiveImage}
        showsHorizontalScrollIndicator={false}
        style={style.scroll}
        contentOffset={location}
      >
        {images.map((image, i) => <CarouselItem key={`image_${i}`} item={image} />)}
      </ScrollView>

      <View style={style.btnContainer}>
        <Pressable
          disabled={activeImage === 0}
          onPress={handlePrev}
        >
          <View style={activeImage === 0 ? style.btnDisabled : style.prevBtn}>
            <Text style={style.btnText}>Prev</Text>
          </View>
        </Pressable>

        <Pressable
          disabled={activeImage + 1 === images.length}
          onPress={handleNext}
        >
          <View style={activeImage + 1 === images.length ? style.btnDisabled : style.nextBtn}>
            <Text style={style.btnText}>Next</Text>
          </View>
        </Pressable>
      </View>

    </View>
  );
};

const style = StyleSheet.create({
  container: {
    marginTop: height / 4,
  },
  scroll: {
    width, 
    height: 250,
  },
  btnContainer: { 
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 24,
  },
  nextBtn: {
    backgroundColor: '#161616',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    margin: 8,
  },
  prevBtn: {
    backgroundColor: '#161616',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    margin: 8,
  },
  btnText: {
    color: '#fff',
    padding: 12,
    fontSize: 24,
  },
  btnDisabled: {
    backgroundColor: '#828282',
    borderRadius: 12,
    margin: 8,
  }
});

export default Carousel;
