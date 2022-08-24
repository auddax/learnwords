import { GAMES } from '../../types/enums';
import { IGameResult } from '../../types/interfaces';

class GameResult implements IGameResult {
  gameType: GAMES;

  constructor(gameType: GAMES) {
    this.gameType = gameType;
  }

  render(score: number) {
    const main = document.querySelector('.page-content') as HTMLElement;
    if (main) {
      main.innerHTML = `
        <section class="game-result">
          <header class="game-result__header">
            <h1>Your score: ${String(score)}</h1>
          </header>
          <form class="sprint-result__form">
            <button type="button" class="button" id="new${this.gameType}Game">Change Level</button>
            <button type="button" class="button" id="start${this.gameType}Game">Try again</button>
          </form>
        </section>
      `;
    }
  }
}

export default GameResult;
