import { IMAGES } from '../models/index';

export const getImages = async () => {
  return new Promise((res, rej) => { setTimeout(() => res(IMAGES), 1500)});
};
