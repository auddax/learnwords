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
      'Audio Challenge',
      'The Audio Challenge training improves your listening comprehension.',
      this.gameType,
    );
    this.game = new AudioChallengeGame(this.gameType);
    this.words = [];
  }

  listen(target: HTMLElement) {
    this.game.listen(target);
    this.selectLevel(target);
    this.gameStart(target);
    this.gameNew(target);
  }

  async gameStart(target: HTMLElement) {
    if (target.id !== `start${this.gameType}Game`) return;
    this.words = await this.getWords();
    this.game.start(this.words);
  }

  selectLevel(target: HTMLElement) {
    if (!target.classList.contains('form__button-level')) return;
    const buttons = document.querySelectorAll('.form__button-level');
    buttons.forEach((btn) => {
      if (btn.classList.contains('form__button-level_selected')) {
        btn.classList.remove('form__button-level_selected');
      }
    });
    target.classList.add('form__button-level_selected');
    const level = Number(target.id.slice(-1));
    this.level = level;
  }

  gameNew(target: HTMLElement) {
    if (target.id !== `new${this.gameType}Game`) return;
    this.start.render();
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
