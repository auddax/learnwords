/* eslint-disable class-methods-use-this */
import { ISprintResult } from '../../../types/interfaces';

class SprintResult implements ISprintResult {
  render(score: number) {
    const main = document.querySelector('.page-content') as HTMLElement;
    if (main) {
      main.innerHTML = `
        <section class="sprint-result">
          <header class="sprint-result__header">
            <h1>Your score: ${String(score)}</h1>
          </header>
          <form class="sprint-result__form">
            <button type="button" class="button" id="newSprintGame">Change Level</button>
            <button type="button" class="button" id="startSprintGame">Try again</button>
          </form>
        </section>
      `;
    }
  }
}

export default SprintResult;
