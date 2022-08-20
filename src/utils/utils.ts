import environment from '../environment/environment';

/* eslint-disable import/prefer-default-export */
export const getRandomPage = () => {
  const { wordsPages } = environment;
  return Math.floor(Math.random() * wordsPages);
};
