/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import {
  ISprint, ISprintGame, ISprintStart, IWords,
} from '../../types/interfaces';
import { LEVEL, PATH } from '../../types/enums';
import SprintGame from '../SprintGame/sprintGame';
import SprintStart from '../SprintStart/sprintStart';
import Loader from '../Loader/loader';
import environment from '../../environment/environment';
import { getRandomNumber } from '../../utils/utils';

class Sprint extends Loader implements ISprint {
  baseUrl: string;

  level: LEVEL;

  start: ISprintStart;

  game: ISprintGame;

  words: IWords[];

  constructor() {
    super();
    this.baseUrl = environment.baseUrl;
    this.level = environment.defaultLevel;
    this.start = new SprintStart();
    this.game = new SprintGame();
    this.words = [];
  }

  listen(target: HTMLElement) {
    this.gameStart(target);
    this.selectLevel(target);
  }

  async gameStart(target: HTMLElement) {
    if (target.id !== 'startSprintGame') return;
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

export default Sprint;
