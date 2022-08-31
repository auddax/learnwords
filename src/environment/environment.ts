import { LEVEL } from '../types/enums';

const environment = {
  baseUrl: 'https://rslng.herokuapp.com',
  levelDefault: LEVEL.A1,
  wordsNumber: 20,
  wordsPagesNumber: 30,
  wordsIndexDefault: 0,
  scoreIncrement: 10,
  scoreDefault: 0,
  shuffleSprintStep: 2,
  shuffleAudioStep: 1,
  timerSprintDefault: 0,
  timerSprintMax: 30,
  timerSprintInterval: 1000,
  timeoutSprintRender: 200,
  audioWordsNumber: 10,
  audioAnswersNumber: 4,
};

export default environment;
