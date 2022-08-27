/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import { IAudioChallenge, IGames, ISprint } from '../../types/interfaces';
import AudioChallenge from '../AudioChallenge/audioChallenge';
import Sprint from '../Sprint/sprint';
import './games.scss';

class Games implements IGames {
  sprint: ISprint;

  audio: IAudioChallenge;

  constructor() {
    this.sprint = new Sprint();
    this.audio = new AudioChallenge();
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
    if (target.id !== 'sprintCard') return;
    this.sprint.render();
  }

  renderAudioGame(target: HTMLElement) {
    if (target.id !== 'audioCard') return;
    this.audio.render();
  }

  render() {
    const main = document.querySelector('.page-content') as HTMLElement;
    if (main) {
      main.innerHTML = `
        <section class="games-page">
          <div class="games-page__card center-content" id="sprintCard">
            <h2>Sprint Game</h2>
          </div>
          <div class="games-page__card center-content" id="audioCard">
            <h2>Audio Challenge</h2>
          </div>
        </section>
      `;
    }
  }
}

export default Games;
