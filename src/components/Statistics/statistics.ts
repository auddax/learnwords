/* eslint-disable max-lines-per-function */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import { IStatistics } from '../../types/interfaces';
import './statistics.scss';

class Statistics implements IStatistics {
  render() {
    const main = document.querySelector('.page-content') as HTMLElement;
    if (main) {
      main.innerHTML = `
        <section class="statistics-page">
          <header class="statistics-page__header">
            <h1>Статистика</h1>
          </header>
          <article class="statistics-page__card">
            <header class="card__header">
              <form class="card__navbar">
                <button type="button" class="button button-navbar">Today</button>
                <button type="button" class="button button-navbar">All period</button>
              </form>
            </header>
            <section class="card__content">
              <div class="card__column">
                <figure class="card__img">
                  <img src="./img/dictionary-card.svg" alt="Dictionary">
                </figure>
                <p class="card__words">15 new words</p>
                <p class="card__words">5 words learned</p>
                <h3 class="card__subheader">Accuracy</h3>
                <div class="card__circular-progress">
                  <div class="circular-progress">
                    <div class="value-container">0%</div>
                  </div>
                </div>  
              </div>
              <div class="card__column">
                <figure class="card__img">
                  <img src="./img/audio-challenge-game-logo.svg" alt="Headphones">
                </figure>
                <p class="card__words">15 new words</p>
                <p class="card__words">5 words learned</p>
                <h3 class="card__subheader">Accuracy</h3>
                <div class="card__circular-progress">
                  <div class="circular-progress">
                    <div class="value-container">0%</div>
                  </div>
                </div>
              </div>
              <div class="card__column">
                <figure class="card__img">
                  <img src="./img/sprint-game-logo.svg" alt="Brain">
                </figure>
                <p class="card__words">15 new words</p>
                <p class="card__words">5 words learned</p>
                <h3 class="card__subheader">Accuracy</h3>
                <div class="card__circular-progress">
                  <div class="circular-progress">
                    <div class="value-container">0%</div>
                  </div>
                </div>
              </div>
            </section>
          </article>
        </section>
      `;
    }
  }
}

export default Statistics;
