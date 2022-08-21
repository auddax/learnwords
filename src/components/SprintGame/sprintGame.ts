/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import { ISprintGame, IWords } from '../../types/interfaces';
import { shuffleArray } from '../../utils/utils';
import './sprintGame.scss';

class SprintGame implements ISprintGame {
  start(words: IWords[]) {
    const shuffledWords = shuffleArray(words);
    this.render(words, shuffledWords);
  }

  render(words: IWords[], shuffledWords: IWords[]) {
    const main = document.querySelector('.page-content');
    const content = `
      ${words.map((item) => `<td>${item.word}</td>`).join('')}
    `;
    const shuffledContent = `
      ${shuffledWords.map((item) => `<td>${item.word}</td>`).join('')}
    `;
    if (main) {
      main.innerHTML = `
        <table>
          <tr>
            ${content}
          </tr>
          <tr>
            ${shuffledContent}
          </tr>
        <table>
      `;
    }
  }
}

export default SprintGame;
