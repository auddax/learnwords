import { View } from '../../types/enums';
import { IAudioChallenge, IGames, ISprint } from '../../types/interfaces';
import AudioChallenge from '../AudioChallenge/audioChallenge';
import Sprint from '../Sprint/sprint';
import './games.scss';

class Games implements IGames {
  sprint: ISprint;

  audio: IAudioChallenge;

  classPrefix: View;

  constructor() {
    this.sprint = new Sprint();
    this.audio = new AudioChallenge();
    this.classPrefix = View.GAMES;
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
    const main = document.querySelector('.page-content') as HTMLElement;
    if (main) {
      main.innerHTML = `
        <main class="${this.classPrefix}-page container">
          <header class="${this.classPrefix}-page__header">
            <h1>Games</h1>
          </header>
          <section class="${this.classPrefix}-page__cardbox">
            <div class="${this.classPrefix}-page__card card-common">
              <figure class="card__img">
                <img src="./img/audio-challenge-game-logo.svg">
              </figure>
              <h2 class="card__title">Sprint Game</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</p>
              <button type="button" class="card__button-primary" id="sprintCardButton">Start game</button>
            </div>
            <div class="${this.classPrefix}-page__card card-common">
              <figure class="card__img">
                <img src="./img/sprint-game-logo.svg">
              </figure>
              <h2 class="card__title">Audio Challenge</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</p>
              <button type="button" class="card__button-primary" id="audioCardButton">Start game</button>
            </div>
          </section>
        </main>
      `;
    }
  }
}

export default Games;
