import { IWords } from '../types/interfaces';

export function getRandomNumber(ceil: number, floor = 0): number {
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

export function classToggler(target: HTMLElement, targetClassName: string): void {
  const buttons = document.querySelectorAll(`.${targetClassName}`);
  buttons.forEach((btn) => {
    if (btn.classList.contains(`${targetClassName}_selected`)) {
      btn.classList.remove(`${targetClassName}_selected`);
    }
  });
  target.classList.add(`${targetClassName}_selected`);
}

export function progressBar(
  barElement: HTMLElement,
  valueElement: HTMLElement,
  progressEndValue: number,
) {
  const bar = barElement;
  const value = valueElement;
  const speed = 10;
  let progressValue = 0;

  const progress = setInterval(() => {
    progressValue += 1;
    if (value) value.textContent = `${progressValue}%`;
    if (bar) {
      bar.style.background = `conic-gradient(
        #51D7FF ${progressValue * 3.6}deg,
        #D5F2FB ${progressValue * 3.6}deg
      )`;
    }
    if (progressValue === progressEndValue) clearInterval(progress);
    if (progressValue > 100) clearInterval(progress);
  }, speed);
}
