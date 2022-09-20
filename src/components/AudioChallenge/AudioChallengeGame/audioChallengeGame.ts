import { GAMES } from '../../../types/enums';
import { IAudioChallengeGame, IGameResult, IWords } from '../../../types/interfaces';
import { pickRandomItems, shuffleArray } from '../../../utils/utils';
import GameResult from '../../GameResult/gameResult';
import environment from '../../../environment/environment';
import './audioChallengeGame.scss';

class AudioChallengeGame implements IAudioChallengeGame {
  currentWordIndex: number;

  currentWord: IWords;

  rightAnswers: number;

  rightAnswerWords: string[];

  wrongAnswerWords: string[];

  gameType: GAMES;

  words: IWords[];

  pickedWords: IWords[];

  result: IGameResult;

  classPrefix: string;

  constructor(gameType: GAMES) {
    this.currentWordIndex = environment.wordsIndexDefault;
    this.currentWord = {};
    this.rightAnswers = environment.scoreDefault;
    this.rightAnswerWords = [];
    this.wrongAnswerWords = [];
    this.gameType = gameType;
    this.words = [];
    this.pickedWords = [];
    this.result = new GameResult(this.gameType);
    this.classPrefix = this.gameType.toLowerCase();
  }

  listen(target: HTMLElement) {
    this.answerAudioGame(target);
    this.turnAudioOn(target);
    this.nextCard(target);
  }

  start(words: IWords[]) {
    this.rightAnswers = environment.scoreDefault;
    this.currentWordIndex = environment.wordsIndexDefault;
    this.words = words;
    this.pickedWords = pickRandomItems(this.words, environment.audioWordsNumber);
    this.currentWord = this.pickedWords[this.currentWordIndex];
    this.render();
  }

  generateAnswerWords(): IWords[] {
    const filteredWords = this.words.filter((item) => item.id !== this.currentWord.id);
    let answerWords = pickRandomItems(filteredWords, environment.audioAnswersNumber);
    answerWords.push(this.currentWord);
    answerWords = shuffleArray(answerWords, environment.shuffleAudioStep);
    return answerWords;
  }

  answerAudioGame(target: HTMLElement): void {
    if (!target.id.includes('audioGameAnswer')
      || target.classList.contains('button_disabled')) return;

    const currentWord = this.currentWord.word;
    const selectedWord = target.id.split('-')[1];
    const currentWordId = this.currentWord.id;

    if (currentWord === selectedWord) {
      this.rightAnswers += 1;
      this.rightAnswerWords.push(currentWordId);
      target.classList.add('button__audio-game-answer_right');
    } else {
      this.wrongAnswerWords.push(currentWordId);
      target.classList.add('button__audio-game-answer_wrong');
      const currentWordElement = document.querySelector(`#audioGameAnswer-${currentWord}`);
      if (currentWordElement) currentWordElement.classList.add('button__audio-game-answer_right');
    }
    this.currentWordIndex += 1;

    if (this.currentWordIndex >= this.pickedWords.length) {
      this.result.render(
        this.rightAnswers,
        this.rightAnswerWords,
        this.wrongAnswerWords,
        environment.audioWordsNumber,
      );
    } else {
      this.showResult();
    }
  }

  turnAudioOn(target: HTMLElement) {
    if (target.id !== 'turnAudioOn') return;
    const element = document.getElementById(`${this.classPrefix}WordSound`) as HTMLMediaElement;
    element.play();
  }

  nextCard(target: HTMLElement) {
    if (target.id !== 'nextCard') return;
    this.currentWord = this.pickedWords[this.currentWordIndex];
    this.render();
  }

  showResult() {
    const wordElement = document.querySelector(`.${this.classPrefix}-game__word`);
    const nextCardButton = document.querySelector(`#${this.classPrefix}GameNextCard`);
    const answerButtons = document.querySelectorAll(`.button__${this.classPrefix}-game-answer`);

    if (wordElement) {
      wordElement.innerHTML = `
        <figure>
          <img src="${environment.baseUrl}/${this.currentWord.image}" class="${this.classPrefix}-game__img">
          <figcaption class="center-content ${this.classPrefix}-game__description">
            <div class="description__translation">
              <h3>${this.currentWord.word}</h3>
              <div class="translation-button" id="turnAudioOn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path>
                </svg>
              </div>
            </div>
            <audio id="${this.classPrefix}WordSound">
              <source src="${environment.baseUrl}/${this.currentWord.audio}" type="audio/mpeg">
            </audio>
          </figcaption>
        </figure>
      `;
    }

    if (nextCardButton) {
      nextCardButton.innerHTML = `
        <button type="button" class="button-next" id="nextCard">Далее</button>
      `;
    }

    if (answerButtons) answerButtons.forEach((button) => button.classList.add('button_disabled'));
  }

  render() {
    const answers = this.generateAnswerWords().map((item, index) => `
      <button type="button" class="button button__${this.classPrefix}-game-answer" id="${this.classPrefix}GameAnswer-${item.word}">
        ${index + 1}. ${item.wordTranslate}
      </button>
    `).join('');
    const main = document.querySelector('.page-content');
    if (main) {
      main.innerHTML = `
        <section class="${this.classPrefix}-game">
          <div class="${this.classPrefix}-game__card">
            <div class="${this.classPrefix}-game__word">
              <div class="${this.classPrefix}-game__audio" id="turnAudioOn">
                <svg class="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path>
                </svg>
                <audio autoplay id="${this.classPrefix}WordSound">
                  <source src="${environment.baseUrl}/${this.currentWord.audio}" type="audio/mpeg">
                </audio>
              </div>
            </div>
            <div class="${this.classPrefix}-game__score">
            </div>            
            <form class="${this.classPrefix}-game__answer">
              <div class="answer">
                ${answers}
              </div>
              <div class="noanswer" id="${this.classPrefix}GameNextCard">
                <button type="button" class="button-next" id="${this.classPrefix}GameAnswer-noanswer">Я не знаю</button>
              </div>
            </form>
          </div>
        </section>
      `;
    }
  }
}

export default AudioChallengeGame;
