import { LEVEL } from '../types/enums';

const environment = {
  baseUrl: 'https://rslng.herokuapp.com',
  levelDefault: LEVEL.A1,
  wordsNumber: 20,
  wordsPagesNumber: 30,
  wordsIndexDefault: 0,
  scoreSprintDefault: 0,
  scoreSprintIncrement: 10,
  timerSprintDefault: 0,
  timerSprintMax: 30,
  timerSprintInterval: 1000,
};

export default environment;
