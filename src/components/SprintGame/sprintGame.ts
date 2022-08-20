/* eslint-disable class-methods-use-this */
import { ISprintGame, IWords } from '../../types/interfaces';

class SprintGame implements ISprintGame {
  render(words: IWords[]) {
    const main = document.querySelector('.page-content');
    const content = `
      <div>
        ${words.map((item) => `<p>${item.word}</p>`).join('')}
      </div>
    `;
    if (main) main.innerHTML = content;
  }
}

export default SprintGame;
