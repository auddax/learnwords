/* eslint-disable class-methods-use-this */
import { ISprintStart } from '../../types/interfaces';

class SprintStart implements ISprintStart {
  render() {
    const main = document.querySelector('.page-content') as HTMLElement;
    if (main) {
      main.innerHTML = `
        <section class="sprint-start">
          <header class="sprint-start__header">Спринт</header>
          <p class="sprint-start__subheader">Спринт - это тренировка на скорость. 
          Попробуй угадать как можно больше слов за 30 секунд.
          <form class="sprint-start__form">
            <p>Выбери уровень</p>
            <button type="button" class="button_level" id="level0">A1</button>
            <button type="button" class="button_level" id="level1">A2</button>
            <button type="button" class="button_level" id="level2">B1</button>
            <button type="button" class="button_level" id="level3">B2</button>
            <button type="button" class="button_level" id="level4">C1</button>
            <button type="button" class="button_level" id="level5">C2</button>
            <button type="button" class="button" id="startSprintGame">Начать</button>
          </form>
        </section>
      `;
    }
  }
}

export default SprintStart;
