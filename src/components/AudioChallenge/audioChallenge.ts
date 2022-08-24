/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import {
  IAudioChallenge, IGameStart, IWords,
} from '../../types/interfaces';
import { GAMES, LEVEL, PATH } from '../../types/enums';
import Loader from '../Loader/loader';
import environment from '../../environment/environment';
import { getRandomNumber } from '../../utils/utils';
import GameStart from '../GameStart/gameStart';

class AudioChallenge extends Loader implements IAudioChallenge {
  baseUrl: string;

  level: LEVEL;

  gameType: GAMES;

  start: IGameStart;

  words: IWords[];

  constructor() {
    super();
    this.baseUrl = environment.baseUrl;
    this.level = environment.levelDefault;
    this.gameType = GAMES.AUDIO;
    this.start = new GameStart(
      'Аудиовызов',
      'Тренировка Аудиовызов улучшает твое восприятие речи на слух.',
      this.gameType,
    );
    this.words = [];
  }

  listen(target: HTMLElement) {
    this.selectLevel(target);
  }

  async gameStart(target: HTMLElement) {
    if (target.id !== 'startSprintGame') return;
    this.words = await this.getWords();
  }

  selectLevel(target: HTMLElement) {
    if (!target.classList.contains('button_level')) return;
    const level = Number(target.id.slice(-1));
    this.level = level;
  }

  async getWords() {
    const page = getRandomNumber(environment.wordsPagesNumber);
    const pathVars = { [PATH.WORDS]: null };
    const queryParams = { group: this.level, page };
    const params = { pathVars, queryParams };
    const response = await super.getResponse(params);
    const words = await response.json();
    return words;
  }

  render() {
    this.start.render();
  }
}

export default AudioChallenge;
