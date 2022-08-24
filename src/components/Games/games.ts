/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import { IGames, ISprint } from '../../types/interfaces';
import Sprint from '../Sprint/sprint';
import './games.scss';

class Games implements IGames {
  sprint: ISprint;

  constructor() {
    this.sprint = new Sprint();
  }

  listen(target: HTMLElement) {
    this.sprint.listen(target);
    this.renderSprintGame(target);
  }

  listenKey(eventCode: string) {
    this.sprint.listenKey(eventCode);
  }

  renderSprintGame(target: HTMLElement) {
    console.log(target.id);
    if (target.id !== 'sprintCard') return;
    this.sprint.render();
  }

  render() {
    const main = document.querySelector('.page-content') as HTMLElement;
    if (main) {
      main.innerHTML = `
        <section class="games-page">
          <div class="games-page__card center-content" id="sprintCard">
            <h2>Sprint Game</h2>
          </div>
          <div class="games-page__card center-content">
          <h2>Audio Challenge</h2>
          </div>
        </section>
      `;
    }
  }
}

export default Games;
