import { IWords } from '../types/interfaces';

export function getRandomNumber(ceil: number, floor = 0) {
  return Math.floor(Math.random() * ceil) + floor;
}

export function shuffleArray(array: IWords[]) {
  const result = [...array];
  let ceil = array.length;
  for (let i = 0; i < array.length; i += 2) {
    const randomIndex = getRandomNumber(ceil);
    const lastNumberIndex = ceil - 1;
    if (randomIndex !== lastNumberIndex) {
      const item = result[randomIndex];
      result[randomIndex] = result[lastNumberIndex];
      result[lastNumberIndex] = item;
    }
    ceil -= 1;
  }
  return result;
}
