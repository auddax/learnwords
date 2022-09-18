import { VIEW } from '../../types/enums';
import { IAudioChallenge, IGames, ISprint } from '../../types/interfaces';
import AudioChallenge from '../AudioChallenge/audioChallenge';
import Sprint from '../Sprint/sprint';
import './games.scss';

class Games implements IGames {
  sprint: ISprint;

  audio: IAudioChallenge;

  classPrefix: VIEW;

  constructor() {
    this.sprint = new Sprint();
    this.audio = new AudioChallenge();
    this.classPrefix = VIEW.GAMES;
  }

  listen(target: HTMLElement) {
    this.sprint.listen(target);
    this.audio.listen(target);
    this.renderSprintGame(target);
    this.renderAudioGame(target);
  }

  listenKey(eventCode: string) {
    this.sprint.listenKey(eventCode);
  }

  renderSprintGame(target: HTMLElement) {
    if (target.id !== 'sprintCardButton') return;
    this.sprint.render();
  }

  renderAudioGame(target: HTMLElement) {
    if (target.id !== 'audioCardButton') return;
    this.audio.render();
  }

  render() {
    localStorage.setItem('rsview', 'games');
    const main = document.querySelector('.page-content') as HTMLElement;
    if (main) {
      main.innerHTML = `
        <section class="${this.classPrefix}-page container">
          <header class="${this.classPrefix}-page__header">
            <h2>Игры</h2>
          </header>
          <section class="${this.classPrefix}-page__cardbox">
            <article class="${this.classPrefix}-page__card card-common">
              <figure class="card__img">
                <img src="./img/audio-challenge-game-logo.svg" alt="Headphones">
              </figure>
              <h3 class="card__title">Аудиовызов</h3>
              <p>Угадай слова по произношению и выбери правильный вариант перевода.</p>
              <button type="button" class="card__button-primary" id="audioCardButton">Начать игру</button>
            </article>
            <article class="${this.classPrefix}-page__card card-common">
              <figure class="card__img">
                <img src="./img/sprint-game-logo.svg" alt="Brain">
              </figure>
              <h3 class="card__title">Спринт</h3>
              <p>Тренируй скорость перевода, выбирая правильные варианты за ограниченное время.</p>
              <button type="button" class="card__button-primary" id="sprintCardButton">Начать игру</button>
            </article>
          </section>
        </section>
      `;
    }
  }
}

export default Games;
