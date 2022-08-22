/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import {
  ISprint, ISprintGame, ISprintStart, IWords,
} from '../../types/interfaces';
import { LEVEL, PATH } from '../../types/enums';
import SprintStart from './SprintStart/sprintStart';
import Loader from '../Loader/loader';
import environment from '../../environment/environment';
import { getRandomNumber } from '../../utils/utils';
import SprintGame from './SprintGame/sprintGame';

class Sprint extends Loader implements ISprint {
  baseUrl: string;

  level: LEVEL;

  view: string;

  start: ISprintStart;

  game: ISprintGame;

  words: IWords[];

  constructor() {
    super();
    this.baseUrl = environment.baseUrl;
    this.level = environment.levelDefault;
    this.view = 'start';
    this.start = new SprintStart();
    this.game = new SprintGame();
    this.words = [];
  }

  listen(target: HTMLElement) {
    this.game.listen(target);
    this.gameStart(target);
    this.gameNew(target);
    this.selectLevel(target);
  }

  listenKey(eventCode: string) {
    this.game.answerSprintGameKey(eventCode);
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

  gameNew(target: HTMLElement) {
    if (target.id !== 'newSprintGame') return;
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

export default Sprint;
