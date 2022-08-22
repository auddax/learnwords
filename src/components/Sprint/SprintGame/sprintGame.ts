/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import environment from '../../../environment/environment';
import { ISprintGame, ISprintResult, IWords } from '../../../types/interfaces';
import { shuffleArray } from '../../../utils/utils';
import SprintResult from '../SprintResult/sprintResult';
import './sprintGame.scss';

class SprintGame implements ISprintGame {
  currentWordIndex: number;

  score: number;

  time: number;

  timerId: NodeJS.Timer | undefined;

  words: IWords[];

  shuffledWords: IWords[];

  result: ISprintResult;

  constructor() {
    this.currentWordIndex = environment.wordsIndexDefault;
    this.score = environment.scoreSprintDefault;
    this.time = environment.timerSprintDefault;
    this.timerId = undefined;
    this.words = [];
    this.shuffledWords = [];
    this.result = new SprintResult();
  }

  listen(target: HTMLElement) {
    this.answerSprintGameMouse(target);
  }

  start(words: IWords[]) {
    this.currentWordIndex = environment.wordsIndexDefault;
    this.score = environment.scoreSprintDefault;
    this.words = words;
    this.shuffledWords = shuffleArray(words);
    this.render(
      this.words[this.currentWordIndex].word,
      this.shuffledWords[this.currentWordIndex].wordTranslate,
      this.score,
    );
    this.timer();
  }

  answerSprintGameMouse(target: HTMLElement) {
    if (!target.classList.contains('answer-sprint-game')) return;
    const wordOrigin = this.words[this.currentWordIndex].word;
    const wordShuffled = this.shuffledWords[this.currentWordIndex].word;

    if (wordOrigin === wordShuffled) {
      if (target.id === 'sprintGameTrue') this.score += environment.scoreSprintIncrement;
    } else if (target.id === 'sprintGameFalse') this.score += environment.scoreSprintIncrement;

    if (this.currentWordIndex + 1 >= environment.wordsNumber) {
      this.result.render(this.score);
      clearInterval(this.timerId);
      this.timerId = undefined;
      this.time = environment.timerSprintDefault;
    } else {
      this.currentWordIndex += 1;
      this.render(
        this.words[this.currentWordIndex].word,
        this.shuffledWords[this.currentWordIndex].wordTranslate,
        this.score,
      );
    }
  }

  answerSprintGameKey(eventCode: string) {
    if (!(eventCode === 'ArrowRight' || eventCode === 'ArrowLeft')) return;
    if (!this.timerId) return;
    const wordOrigin = this.words[this.currentWordIndex].word;
    const wordShuffled = this.shuffledWords[this.currentWordIndex].word;

    if (wordOrigin === wordShuffled) {
      if (eventCode === 'ArrowRight') this.score += environment.scoreSprintIncrement;
    } else if (eventCode === 'ArrowLeft') this.score += environment.scoreSprintIncrement;

    if (this.currentWordIndex + 1 >= environment.wordsNumber) {
      this.result.render(this.score);
      clearInterval(this.timerId);
      this.timerId = undefined;
      this.time = environment.timerSprintDefault;
    } else {
      this.currentWordIndex += 1;
      this.render(
        this.words[this.currentWordIndex].word,
        this.shuffledWords[this.currentWordIndex].wordTranslate,
        this.score,
      );
    }
  }

  timer() {
    const startTime = Date.now();
    let timePassed = 0;
    this.timerId = setInterval(() => {
      timePassed = Date.now() - startTime;
      this.time = Math.floor(timePassed / 1000);
      if (this.time > environment.timerSprintMax) {
        clearInterval(this.timerId);
        this.timerId = undefined;
        this.result.render(this.score);
        this.time = environment.timerSprintDefault;
        return;
      }
      const timerElement = document.querySelector('.timer__value');
      if (timerElement) timerElement.innerHTML = String(this.time);
    }, 1000);
    this.time = environment.timerSprintDefault;
  }

  render(word: string, translate: string, score: number) {
    const main = document.querySelector('.page-content');
    if (main) {
      main.innerHTML = `
        <section class="sprint-game">
          <div class="sprint-game__card">
            <div class="sprint-game__timer">
              <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
                <path d="M18 5V2h12v3Zm4.5 22.35h3v-11.5h-3Zm1.5 16.6q-3.7 0-6.975-1.425Q13.75 41.1 11.3 38.65q-2.45-2.45-3.875-5.725Q6 29.65 6 25.95q0-3.7 1.425-6.975Q8.85 15.7 11.3 13.25q2.45-2.45 5.725-3.875Q20.3 7.95 24 7.95q3.35 0 6.3 1.125 2.95 1.125 5.25 3.125l2.55-2.55 2.1 2.1-2.55 2.55q1.8 2 3.075 4.85Q42 22 42 25.95q0 3.7-1.425 6.975Q39.15 36.2 36.7 38.65q-2.45 2.45-5.725 3.875Q27.7 43.95 24 43.95Zm0-3q6.25 0 10.625-4.375T39 25.95q0-6.25-4.375-10.625T24 10.95q-6.25 0-10.625 4.375T9 25.95q0 6.25 4.375 10.625T24 40.95ZM24 26Z"/>
              </svg>
              <div class="timer__value">${this.time}</div>
            </div>
            <div class="sprint-game__result">
              Score: ${String(score)}
            </div>
            <div class="sprint-game__words">
              <p>${word}</p>
              <p>${translate}</p>
            </div>
            <form>
              <button type="button" class="button answer-sprint-game" id="sprintGameFalse">False</button>
              <button type="button" class="button answer-sprint-game" id="sprintGameTrue">True</button>
            </form>
          </div>
        </section>
      `;
    }
  }
}

export default SprintGame;
