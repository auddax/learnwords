import { ISprint, ISprintGame, ISprintStart } from '../../types/interfaces';
import SprintStart from '../SprintStart/sprintStart';

class Sprint implements ISprint {
  start: ISprintStart;

  game: ISprintGame;

  constructor() {
    this.start = new SprintStart();
    this.game = new SprintGame();
  }

  listen(target: HTMLElement) {
    this.gameRender(target);
  }

  gameRender(target: HTMLElement) {
    if (target.id !== 'startSprintGame') return;
    this.game.render();
  }

  render() {
    const main = document.querySelector('.page-content');
    if (main) main.innerHTML = this.start.render();
  }
}

export default Sprint;
