import { IMAGES } from '../models/index';
import * as SecureStore from 'expo-secure-store';

export const getImages = async () => {
  return new Promise((res, rej) => { setTimeout(() => res(IMAGES), 1500)});
};

export const saveLastImage = async (imageIndex) => {
  try {
    await SecureStore.setItemAsync('lastImage', `${imageIndex}`);
  } catch (error) {
    console.log(error);
  }
};

export const getLastImage = async () => {
  return await SecureStore.getItemAsync('lastImage');
};
