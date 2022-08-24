/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import {
  IAudioChallenge, IAudioChallengeGame, IGameStart, IWords,
} from '../../types/interfaces';
import { GAMES, LEVEL, PATH } from '../../types/enums';
import Loader from '../Loader/loader';
import environment from '../../environment/environment';
import { getRandomNumber } from '../../utils/utils';
import GameStart from '../GameStart/gameStart';
import AudioChallengeGame from './AudioChallengeGame/audioChallengeGame';

class AudioChallenge extends Loader implements IAudioChallenge {
  baseUrl: string;

  level: LEVEL;

  gameType: GAMES;

  start: IGameStart;

  game: IAudioChallengeGame;

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
    this.game = new AudioChallengeGame(this.gameType);
    this.words = [];
  }

  listen(target: HTMLElement) {
    this.game.listen(target);
    this.selectLevel(target);
    this.gameStart(target);
  }

  async gameStart(target: HTMLElement) {
    if (target.id !== 'startAudioGame') return;
    this.words = await this.getWords();
    this.game.start(this.words);
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
