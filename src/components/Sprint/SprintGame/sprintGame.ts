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

  words: IWords[];

  shuffledWords: IWords[];

  result: ISprintResult;

  constructor() {
    this.currentWordIndex = environment.wordsIndexDefault;
    this.score = environment.scoreDefault;
    this.words = [];
    this.shuffledWords = [];
    this.result = new SprintResult();
  }

  listen(target: HTMLElement) {
    this.answerSprintGame(target);
  }

  start(words: IWords[]) {
    this.currentWordIndex = environment.wordsIndexDefault;
    this.score = environment.scoreDefault;
    this.words = words;
    this.shuffledWords = shuffleArray(words);
    this.render(
      this.words[this.currentWordIndex].word,
      this.shuffledWords[this.currentWordIndex].wordTranslate,
      this.score,
    );
  }

  answerSprintGame(target: HTMLElement) {
    if (!target.classList.contains('answer-sprint-game')) return;
    const wordOrigin = this.words[this.currentWordIndex].word;
    const wordShuffled = this.shuffledWords[this.currentWordIndex].word;

    if (wordOrigin === wordShuffled) {
      if (target.id === 'sprintGameTrue') this.score += environment.scoreIncrement;
    } else if (target.id === 'sprintGameFalse') this.score += environment.scoreIncrement;

    if (this.currentWordIndex + 1 >= environment.wordsNumber) {
      this.result.render(this.score);
    } else {
      this.currentWordIndex += 1;
      this.render(
        this.words[this.currentWordIndex].word,
        this.shuffledWords[this.currentWordIndex].wordTranslate,
        this.score,
      );
    }
  }

  render(word: string, translate: string, score: number) {
    const main = document.querySelector('.page-content');
    if (main) {
      main.innerHTML = `
        <section class="sprint-game">
          <div class="sprint-game__card">
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
