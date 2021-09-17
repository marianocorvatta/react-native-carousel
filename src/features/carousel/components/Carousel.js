import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Dimensions,
  Pressable,
  Text,
  FlatList,
  Image,
} from 'react-native';

import { carouselStyle } from '../styles/index';
import { saveLastImage, getLastImage } from '../../../services/index';

const { width } = Dimensions.get('window');

const ITEM_SIZE = width * 0.72;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;

const Carousel = ({ images }) => {
  const [localImages, setLocalImages] = useState([]);
  const [activeImage, setActiveImage] = useState(1);
  const [init, setInit] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    if (!init) {
      getLastImage()
        .then((res) => {
          setInit(true);
          setActiveImage(Number(res));
        })
        .catch((err) => console.log(err));
    }
  }, [init]);

  useEffect(() => {
    setLocalImages([{ title: 'space', image: null },...images, { title: 'space', image: null }]);
  }, [images]);

  const handleChangeActiveImage = (e) => {
    const imageIndex = Math.ceil(e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width);
    if (imageIndex !== activeImage) {
      setActiveImage(imageIndex);
      saveLastImage(imageIndex)
    }
  };

  const handleNext = () => {
    setActiveImage(activeImage + 1);
    listRef.current.scrollToIndex({index: activeImage + 1});
  };

  const handlePrev = () => {
    setActiveImage(activeImage - 1);
    listRef.current.scrollToIndex({index: activeImage - 1});
  };

  return (
    <View  style={carouselStyle.container}>
      <FlatList
        ref={listRef}
        showsHorizontalScrollIndicator={false}
        data={localImages}
        keyExtractor={(item,index) => index.toString()}
        horizontal
        contentContainerStyle={carouselStyle.flatListContainer}
        initialScrollIndex={activeImage}
        getItemLayout={(data, index) => (
          {length: ITEM_SIZE, offset: ITEM_SIZE * index, index}
        )}
        snapToInterval={ITEM_SIZE}
        decelerationRate={0}
        onScroll={handleChangeActiveImage}
        scrollEventThrottle={16}
        bounces={false}
        renderItem={({ item }) => {

          if(!item.image) {
            return <View style={{ width: EMPTY_ITEM_SIZE }}/>
          }

          return (
            <View style={{ width: ITEM_SIZE }}>
              <View style={carouselStyle.imageContainer}>
                <Image
                  source={{ uri: item.image }}
                  style={carouselStyle.image}
                />
              </View>
            </View>
          );
        }}
      />

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
