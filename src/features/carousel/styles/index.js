import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const ITEM_SIZE = width * 0.72;

export const carouselScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
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

export const carouselStyle = StyleSheet.create({
  container: {
    flex: 1
  },
  flatListContainer: {
    alignItems: 'center'
  },
  btnContainer: { 
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 24,
  },
  imageContainer: {
    marginHorizontal: 15,
    alignItems: 'center',
    borderRadius: 34,
  },
  image: {
    width: '100%',
    height: ITEM_SIZE,
    resizeMode: 'cover',
    borderRadius: 24,
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
