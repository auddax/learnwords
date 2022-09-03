import { GAMES } from '../../types/enums';
import { IGameResult } from '../../types/interfaces';
import { progressBar } from '../../utils/utils';
import './gameResult.scss';

class GameResult implements IGameResult {
  gameType: GAMES;

  constructor(gameType: GAMES) {
    this.gameType = gameType;
  }

  render(
    rightAnswers: number,
    rightAnswerWords: string[],
    wrongAnswerWords: string[],
    totalWordsNumber: number,
  ) {
    const main = document.querySelector('.page-content') as HTMLElement;

    if (main) {
      main.innerHTML = `
        <section class="game-result">
          <article class="game-result__card">
            <header class="card__header">
              <form class="card__navbar">
                <button type="button" class="button button-navbar" id="gameResultsCard">Results</button>
                <button type="button" class="button button-navbar" id="gameWordsCard">My words</button>
              </form>
            </header>
            <div class="card__content">
              <h2>${rightAnswers} words learned</h2>
              <h2>${(totalWordsNumber - rightAnswers)} words to learn</h2>
            </div>
            <div class="card__circular-progress">
              <div class="circular-progress">
                <div class="value-container">0%</div>
              </div>
            </div>
          </article>
          <form class="game-result__form">
            <button type="button" class="button" id="new${this.gameType}Game">Change Level</button>
            <button type="button" class="button" id="start${this.gameType}Game">Try again</button>
          </form>
        </section>
      `;
    }

    const bar = document.querySelector('.circular-progress') as HTMLElement;
    const value = document.querySelector('.value-container') as HTMLElement;
    const accuracy = (rightAnswers / totalWordsNumber) * 100;
    if (accuracy) progressBar(bar, value, accuracy);
  }
}

export default GameResult;
