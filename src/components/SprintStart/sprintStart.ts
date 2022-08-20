/* eslint-disable class-methods-use-this */
import { ISprintStart } from '../../types/interfaces';

class SprintStart implements ISprintStart {
  render() {
    return (`
      <section class="sprint-start">
        <header class="sprint-start__header">Спринт</header>
        <p class="sprint-start__subheader">Спринт - это тренировка на скорость. 
        Попробуй угадать как можно больше слов за 30 секунд.
        <form class="sprint-start__form">
          <p>Выбери уровень</p>
          <button type="button" class="button_level">A1</button>
          <button type="button" class="button_level">A2</button>
          <button type="button" class="button_level">B1</button>
          <button type="button" class="button_level">B2</button>
          <button type="button" class="button_level">C1</button>
          <button type="button" class="button_level">C2</button>
          <button type="button" class="button" id="startSprintGame">Начать</button>
        </form>
      </section>
    `);
  }
}

export default SprintStart;
