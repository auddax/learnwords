import { IWords } from '../types/interfaces';

export function getRandomNumber(ceil: number, floor = 0) {
  return Math.floor(Math.random() * ceil) + floor;
}

export function shuffleArray(array: IWords[], step: number): IWords[] {
  const result = [...array];
  let ceil = array.length;
  for (let i = 0; i < array.length; i += step) {
    const randomIndex = getRandomNumber(ceil);
    const lastNumberIndex = ceil - 1;
    if (randomIndex !== lastNumberIndex) {
      const item = result[randomIndex];
      result[randomIndex] = result[lastNumberIndex];
      result[lastNumberIndex] = item;
    }
    ceil -= 2;
  }
  return result;
}

export function pickRandomItems(array: IWords[], num: number): IWords[] {
  const input = [...array];
  const result = [];
  for (let i = 0; i < num; i += 1) {
    const randomIndex = getRandomNumber(input.length);
    result.push(...input.splice(randomIndex, 1));
  }
  return result;
}
