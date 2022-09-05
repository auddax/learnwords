import { GAMES } from '../../types/enums';
import { IGameStart } from '../../types/interfaces';
import './gameStart.scss';

class GameStart implements IGameStart {
  header: string;

  description: string;

  gameType: GAMES;

  constructor(header: string, description: string, gameType: GAMES) {
    this.header = header;
    this.description = description;
    this.gameType = gameType;
  }

  render() {
    const img = this.gameType === GAMES.AUDIO
      ? './img/audio-challenge-game-logo.svg'
      : './img/sprint-game-logo.svg';
    const id = `start${this.gameType}Game`;
    const main = document.querySelector('.page-content') as HTMLElement;

    if (main) {
      main.innerHTML = `
        <section class="game-start">
          <figure class="game-start__img">
            <img src="${img}">
          </figure>
          <header class="game-start__header">
            <h1>${this.header}</h1>
          </header>
          <p class="game-start__description">${this.description}</p>
          <form class="game-start__form">
            <h4 class="form__title">Выбери уровень</h4>
            <div class="form__button-group">
              <button type="button" class="form__button-level form__button-level_selected" id="level0">A1</button>
              <button type="button" class="form__button-level" id="level1">A2</button>
              <button type="button" class="form__button-level" id="level2">B1</button>
              <button type="button" class="form__button-level" id="level3">B2</button>
              <button type="button" class="form__button-level" id="level4">C1</button>
              <button type="button" class="form__button-level" id="level5">C2</button>
            </div>
            <button type="button" class="form__button-primary" id="${id}">Начать игру</button>
          </form>
        </section>
      `;
    }
  }
}

export default GameStart;
