import { GAMES } from '../../types/enums';
import { IGameStart } from '../../types/interfaces';

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
    const id = `start${this.gameType}Game`;
    const main = document.querySelector('.page-content') as HTMLElement;
    if (main) {
      main.innerHTML = `
        <section class="game-start">
          <header class="game-start__header">${this.header}</header>
          <p class="game-start__description">${this.description}</p>
          <form class="game-start__form">
            <p>Выбери уровень</p>
            <button type="button" class="button button_level" id="level0">A1</button>
            <button type="button" class="button button_level" id="level1">A2</button>
            <button type="button" class="button button_level" id="level2">B1</button>
            <button type="button" class="button button_level" id="level3">B2</button>
            <button type="button" class="button button_level" id="level4">C1</button>
            <button type="button" class="button button_level" id="level5">C2</button>
            <button type="button" class="button" id="${id}">Начать</button>
          </form>
        </section>
      `;
    }
  }
}

export default GameStart;
