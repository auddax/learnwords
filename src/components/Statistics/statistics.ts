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
          <h1>Statistics</h1>
          </header>
          <div class="statistics-page__card">
          </div>
        </section>
      `;
    }
  }
}

export default Statistics;
