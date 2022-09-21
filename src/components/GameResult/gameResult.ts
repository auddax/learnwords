/* eslint-disable no-console */
import environment from '../../environment/environment';
import { GAMES, RESULTS } from '../../types/enums';
import { IGameResult, IWords } from '../../types/interfaces';
import { progressBar } from '../../utils/utils';
import './gameResult.scss';

class GameResult implements IGameResult {
  gameType: GAMES;

  view: RESULTS;

  rightAnswers: number;

  totalWordsNumber: number;

  rightAnswerWords: IWords[];

  wrongAnswerWords: IWords[];

  constructor(gameType: GAMES) {
    this.gameType = gameType;
    this.view = RESULTS.ACCURACY;
    this.rightAnswers = environment.scoreDefault;
    this.totalWordsNumber = gameType === 'Sprint'
      ? environment.wordsNumber
      : environment.audioWordsNumber;
    this.rightAnswerWords = [];
    this.wrongAnswerWords = [];
  }

  changeView(target: HTMLElement): void {
    if (!target.classList.contains(`game-${this.gameType.toLowerCase()}`)) return;
    if (target.id === 'gameAccuracyCard') {
      this.view = RESULTS.ACCURACY;
      this.render();
    }
    if (target.id === 'gameWordsCard') {
      this.view = RESULTS.WORDS;
      this.render();
    }
  }

  render() {
    const main = document.querySelector('.page-content') as HTMLElement;

    const cardContentAccuracy = `
      <div class="card__content">
        <div class="content__results">
          <h2>${this.rightAnswers} слов изучено</h2>
          <h2>${(this.totalWordsNumber - this.rightAnswers)} слов на изучении</h2>
        </div>
      </div>
      <div class="card__circular-progress">
        <div class="circular-progress">
          <div class="value-container">0%</div>
        </div>
      </div>
    `;

    const cardContentWords = `
      <div class="card__content">
        <div class="content__answers">
          <div class="answers">
            <h2 class="answers__header">Знаю</h2>
            <ul class="answers__words">
              ${this.rightAnswerWords.map((item) => `<li>${Object.entries(item).flat().join(' - ')}</li>`).join('')}
            </ul>
          </div>
          <div class="answers">
            <h2 class="answers__header">Ошибки</h2>
            <ul class="answers__words">
              ${this.wrongAnswerWords.map((item) => `<li>${Object.entries(item).flat().join(' - ')}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    `;

    if (main) {
      main.innerHTML = `
        <section class="game-result">
          <article class="game-result__card">
            <header class="card__header">
              <form class="card__navbar">
                <button type="button" class="button button-navbar game-${this.gameType.toLowerCase()}" id="gameAccuracyCard">Результаты</button>
                <button type="button" class="button button-navbar game-${this.gameType.toLowerCase()}" id="gameWordsCard">Мои слова</button>
              </form>
            </header>
            ${this.view === RESULTS.ACCURACY ? cardContentAccuracy : cardContentWords}
          </article>
          <form class="game-result__form">
            <button type="button" class="button" id="new${this.gameType}Game">Изменить уровень</button>
            <button type="button" class="button" id="start${this.gameType}Game">Попробовать снова</button>
          </form>
        </section>
      `;
    }

    if (this.view === RESULTS.ACCURACY) {
      document.getElementById('gameAccuracyCard')?.classList.add('button-navbar_selected');
    } else {
      document.getElementById('gameWordsCard')?.classList.add('button-navbar_selected');
    }

    const bar = document.querySelector('.circular-progress') as HTMLElement;
    const value = document.querySelector('.value-container') as HTMLElement;
    const accuracy = (this.rightAnswers / this.totalWordsNumber) * 100;
    if (accuracy) progressBar(bar, value, accuracy);
  }
}

export default GameResult;
