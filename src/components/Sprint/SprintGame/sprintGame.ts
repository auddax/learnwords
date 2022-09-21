/* eslint-disable no-console */
/* eslint-disable max-lines-per-function */
import environment from '../../../environment/environment';
import { GAMES } from '../../../types/enums';
import { ISprintGame, IGameResult, IWords } from '../../../types/interfaces';
import { shuffleArray } from '../../../utils/utils';
import GameResult from '../../GameResult/gameResult';
import './sprintGame.scss';

class SprintGame implements ISprintGame {
  currentWordIndex: number;

  rowAnswers: number;

  score: number;

  scoreIncrementIndex: number;

  time: number;

  timerId: NodeJS.Timer | undefined;

  gameType: GAMES;

  words: IWords[];

  shuffledWords: IWords[];

  result: IGameResult;

  constructor() {
    this.currentWordIndex = environment.wordsIndexDefault;
    this.rowAnswers = environment.scoreDefault;
    this.score = environment.scoreDefault;
    this.scoreIncrementIndex = environment.scoreDefault;
    this.time = environment.timerSprintDefault;
    this.timerId = undefined;
    this.gameType = GAMES.SPRINT;
    this.words = [];
    this.shuffledWords = [];
    this.result = new GameResult(this.gameType);
  }

  listen(target: HTMLElement) {
    this.answerSprintGameMouse(target);
    this.stopSprintGame(target);
    this.result.changeView(target);
  }

  start(words: IWords[]) {
    this.stop();
    this.result = new GameResult(this.gameType);
    this.rowAnswers = environment.scoreDefault;
    this.score = environment.scoreDefault;
    this.scoreIncrementIndex = environment.scoreIncrementIndex;
    this.words = words;
    this.shuffledWords = shuffleArray(words, environment.shuffleSprintStep);
    this.render(
      this.words[this.currentWordIndex].word,
      this.shuffledWords[this.currentWordIndex].wordTranslate,
    );
    this.timer();
  }

  stop() {
    if (this.timerId) clearInterval(this.timerId);
    this.timerId = undefined;
    this.time = environment.timerSprintDefault;
    this.currentWordIndex = environment.wordsIndexDefault;
  }

  answerSprintGameMouse(target: HTMLElement) {
    if (!target.classList.contains('button__answer-sprint')) return;
    const wordOrigin = this.words[this.currentWordIndex].word;
    const wordShuffled = this.shuffledWords[this.currentWordIndex].word;
    const wordAnswer = { [wordOrigin]: this.words[this.currentWordIndex].wordTranslate };
    const mark = document.querySelector('.sprint-game__mark') as HTMLElement;
    const checkMark = `
      <svg class="check" viewBox="0 0 24 24">
        <path fill="#31DAE6" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
      </svg>
    `;
    const crossMark = `
      <svg class="check" viewBox="0 0 24 24">
        <path fill="#FF2A54" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path>
      </svg>
    `;

    if (wordOrigin === wordShuffled) {
      if (target.id === 'sprintGameTrue') {
        this.result.rightAnswers += 1;
        this.rowAnswers += 1;
        this.result.rightAnswerWords.push(wordAnswer);
        this.scoreIncrementIndex = Math.floor(this.rowAnswers / environment.rowAnswersNumber) + 1;
        this.score += environment.scoreIncrement * this.scoreIncrementIndex;
        mark.innerHTML = checkMark;
      } else {
        this.rowAnswers = environment.scoreDefault;
        this.result.wrongAnswerWords.push(wordAnswer);
        this.scoreIncrementIndex = Math.floor(this.rowAnswers / environment.rowAnswersNumber) + 1;
        mark.innerHTML = crossMark;
      }
    } else if (target.id === 'sprintGameFalse') {
      this.result.rightAnswers += 1;
      this.rowAnswers += 1;
      this.result.rightAnswerWords.push(wordAnswer);
      this.scoreIncrementIndex = Math.floor(this.rowAnswers / environment.rowAnswersNumber) + 1;
      this.score += environment.scoreIncrement * this.scoreIncrementIndex;
      mark.innerHTML = checkMark;
    } else {
      this.rowAnswers = environment.scoreDefault;
      this.result.wrongAnswerWords.push(wordAnswer);
      this.scoreIncrementIndex = Math.floor(this.rowAnswers / environment.rowAnswersNumber) + 1;
      mark.innerHTML = crossMark;
    }

    if (this.currentWordIndex + 1 >= environment.wordsNumber) {
      setTimeout(() => {
        this.result.render();
      }, environment.timeoutSprintRender);
      this.stop();
    } else {
      this.currentWordIndex += 1;
      setTimeout(() => {
        this.render(
          this.words[this.currentWordIndex].word,
          this.shuffledWords[this.currentWordIndex].wordTranslate,
        );
      }, environment.timeoutSprintRender);
    }
  }

  answerSprintGameKey(eventCode: string) {
    if (!(eventCode === 'ArrowRight' || eventCode === 'ArrowLeft')) return;
    if (!this.timerId) return;
    const wordOrigin = this.words[this.currentWordIndex].word;
    const wordShuffled = this.shuffledWords[this.currentWordIndex].word;
    const wordAnswer = { [wordOrigin]: this.words[this.currentWordIndex].wordTranslate };
    const mark = document.querySelector('.sprint-game__mark') as HTMLElement;
    const checkMark = `
      <svg class="check" viewBox="0 0 24 24">
        <path fill="#31DAE6" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
      </svg>
    `;
    const crossMark = `
      <svg class="check" viewBox="0 0 24 24">
        <path fill="#FF2A54" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path>
      </svg>
    `;

    if (wordOrigin === wordShuffled) {
      if (eventCode === 'ArrowRight') {
        this.result.rightAnswers += 1;
        this.rowAnswers += 1;
        this.result.rightAnswerWords.push(wordAnswer);
        this.scoreIncrementIndex = Math.floor(this.rowAnswers / environment.rowAnswersNumber) + 1;
        this.score += environment.scoreIncrement * this.scoreIncrementIndex;
        mark.innerHTML = checkMark;
      } else {
        this.rowAnswers = environment.scoreDefault;
        this.result.wrongAnswerWords.push(wordAnswer);
        this.scoreIncrementIndex = Math.floor(this.rowAnswers / environment.rowAnswersNumber) + 1;
        mark.innerHTML = crossMark;
      }
    } else if (eventCode === 'ArrowLeft') {
      this.result.rightAnswers += 1;
      this.rowAnswers += 1;
      this.result.rightAnswerWords.push(wordAnswer);
      this.scoreIncrementIndex = Math.floor(this.rowAnswers / environment.rowAnswersNumber) + 1;
      this.score += environment.scoreIncrement * this.scoreIncrementIndex;
      mark.innerHTML = checkMark;
    } else {
      this.rowAnswers = environment.scoreDefault;
      this.result.wrongAnswerWords.push(wordAnswer);
      this.scoreIncrementIndex = Math.floor(this.rowAnswers / environment.rowAnswersNumber) + 1;
      mark.innerHTML = crossMark;
    }

    if (this.currentWordIndex + 1 >= environment.wordsNumber) {
      setTimeout(() => {
        this.result.render();
      }, environment.timeoutSprintRender);
      this.stop();
    } else {
      this.currentWordIndex += 1;
      setTimeout(() => {
        this.render(
          this.words[this.currentWordIndex].word,
          this.shuffledWords[this.currentWordIndex].wordTranslate,
        );
      }, environment.timeoutSprintRender);
    }
  }

  stopSprintGame(target: HTMLElement) {
    if (!target.classList.contains('menu-item')) return;
    if (!this.timerId) return;
    this.stop();
  }

  timer() {
    const startTime = Date.now();
    let timePassed = 0;
    this.timerId = setInterval(() => {
      timePassed = Date.now() - startTime;
      this.time = Math.floor(timePassed / 1000);
      if (this.time > environment.timerSprintMax) {
        this.result.render();
        this.stop();
        return;
      }
      const timerElement = document.querySelector('.timer__value');
      if (timerElement) timerElement.innerHTML = String(this.time);
    }, environment.timerSprintInterval);
    this.time = environment.timerSprintDefault;
  }

  render(word: string, translate: string) {
    const points = environment.scoreIncrement * this.scoreIncrementIndex;
    const main = document.querySelector('.page-content');
    if (main) {
      main.innerHTML = `
        <section class="sprint-game">
          <div class="sprint-game__card">
            <div class="sprint-game__answers">
              <div class="answers__check">
                <svg class="check" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                </svg>
                <svg class="check" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                </svg>
                <svg class="check" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                </svg>
              </div>
              <div class="answers__points">
                <span>${points} баллов за правильный ответ<span>
              </div>
            </div>
            <div class="sprint-game__timer">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M22 5.7l-4.6-3.9-1.3 1.5 4.6 3.9L22 5.7zM7.9 3.4L6.6 1.9 2 5.7l1.3 1.5 4.6-3.8zM12.5 8H11v6l4.7 2.9.8-1.2-4-2.4V8zM12 4c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 16c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7z"/>
              </svg>
              <div class="timer__value">${this.time}</div>
            </div>
            <div class="sprint-game__words">
              <p class="words_word">${word}</p>
              <p class="words_translate">${translate}</p>
            </div>
            <div class="sprint-game__mark">
              <svg class="check" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
              </svg>
            </div>
            <form class="sprint-game__button">
              <button type="button" class="button__answer-sprint" id="sprintGameFalse">
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 11H8.83L14.42 5.41L13 4L5 12L13 20L14.41 18.59L8.83 13H21V11Z"/>
              </svg>
              False
              </button>
              <button type="button" class="button__answer-sprint" id="sprintGameTrue">
                True
                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 11H16.17L10.58 5.41L12 4L20 12L12 20L10.59 18.59L16.17 13H4V11Z"/>
                </svg>
              </button>
            </form>
          </div>
        </section>
      `;
    }
    const checkElements = document.querySelectorAll('.answers__check .check');
    const range = this.rowAnswers >= environment.rowAnswersNumber
      ? this.rowAnswers % environment.rowAnswersNumber
      : this.rowAnswers;
    for (let i = 0; i < range; i += 1) {
      checkElements[i].classList.add('check_true');
    }
  }
}

export default SprintGame;
