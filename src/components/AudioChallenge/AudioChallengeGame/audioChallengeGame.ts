import { GAMES } from '../../../types/enums';
import { IAudioChallengeGame, IGameResult, IWords } from '../../../types/interfaces';
import { pickRandomItems, shuffleArray } from '../../../utils/utils';
import GameResult from '../../GameResult/gameResult';
import environment from '../../../environment/environment';
import './audioChallengeGame.scss';

class AudioChallengeGame implements IAudioChallengeGame {
  currentWordIndex: number;

  currentWord: IWords;

  wrongAnswerWords: IWords[];

  gameType: GAMES;

  words: IWords[];

  pickedWords: IWords[];

  result: IGameResult;

  classPrefix: string;

  constructor() {
    this.currentWordIndex = environment.wordsIndexDefault;
    this.currentWord = {};
    this.wrongAnswerWords = [];
    this.gameType = GAMES.AUDIO;
    this.words = [];
    this.pickedWords = [];
    this.result = new GameResult(this.gameType);
    this.classPrefix = this.gameType.toLowerCase();
  }

  listen(target: HTMLElement) {
    this.answerAudioGame(target);
    this.turnAudioOn(target);
    this.nextCard(target);
    this.result.changeView(target);
  }

  start(words: IWords[]) {
    this.result = new GameResult(this.gameType);
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

  saveAudioAnswers(): void {
    const currentDate = new Date().toJSON().slice(0, 10);
    const answersAudio = localStorage.getItem('answersAudio');

    if (answersAudio) {
      const answersAudioSaved = JSON.parse(answersAudio);
      if (currentDate in answersAudioSaved) {
        const answersAudioSavedToday = answersAudioSaved[currentDate];
        const answersAudioRightWords = this.result.rightAnswerWords.map((answer) => {
          const answerSaved = Object.keys(answer)[0];
          return answerSaved;
        });
        const answersAudioWrongWords = this.result.wrongAnswerWords.map((answer) => {
          const answerSaved = Object.keys(answer)[0];
          return answerSaved;
        });

        const answersAudioRight: IWords[] = [];
        const answersAudioWrong: string[] = [];

        // Check saved right answers
        answersAudioSavedToday.answersAudioRight.forEach((word: IWords) => {
          if (answersAudioRightWords.includes(Object.keys(word)[0])) {
            answersAudioRight.push({
              [Object.keys(word)[0]]: String(+Object.values(word)[0] + 1),
            });
          } else if (!answersAudioWrongWords.includes(Object.keys(word)[0])) {
            answersAudioRight.push(word);
          }
        });

        // Check saved wrong answers
        answersAudioSavedToday.answersAudioWrong.forEach((word: string) => {
          if (!answersAudioRightWords.includes(word)) {
            answersAudioWrong.push(word);
          }
        });

        // Add new right answers
        answersAudioRightWords.forEach((currentAnswer) => {
          if (answersAudioRight.every((word: IWords) => Object.keys(word)[0] !== currentAnswer)) {
            answersAudioRight.push({ [currentAnswer]: '1' });
          }
        });

        // Add new wrong answers
        answersAudioWrong.push(...answersAudioWrongWords);

        answersAudioSaved[currentDate] = {
          answersAudioRight,
          answersAudioWrong,
        };
      } else {
        const answersAudioRightWords = this.result.rightAnswerWords.map((answer) => {
          const answerSaved = Object.keys(answer)[0];
          return answerSaved;
        });

        const answersAudioWrongWords = this.result.wrongAnswerWords.map((answer) => {
          const answerSaved = Object.keys(answer)[0];
          return answerSaved;
        });

        const answersAudioRight: IWords[] = [];
        const answersAudioWrong: string[] = [];

        Object.keys(answersAudioSaved).forEach((date) => {
          // Check saved right answers
          answersAudioSaved[date].answersAudioRight.forEach((word: IWords) => {
            if (answersAudioRightWords.includes(Object.keys(word)[0])) {
              answersAudioRight.push({
                [Object.keys(word)[0]]: String(+Object.values(word)[0] + 1),
              });
            } else if (!answersAudioWrongWords.includes(Object.keys(word)[0])) {
              answersAudioRight.push(word);
            }
          });

          // Check saved wrong answers
          answersAudioSaved[date].answersAudioWrong.forEach((word: string) => {
            if (!answersAudioRightWords.includes(word)) {
              answersAudioWrong.push(word);
            }
          });
        });

        // Add new right answers
        answersAudioRight.forEach((word: IWords) => {
          if (!answersAudioRightWords.includes(Object.keys(word)[0])) {
            answersAudioRight.push({ [Object.keys(word)[0]]: '1' });
          }
        });

        // Add new wrong answers
        answersAudioWrong.push(...answersAudioWrongWords);

        answersAudioSaved[currentDate] = {
          answersAudioRight,
          answersAudioWrong,
        };
      }
      localStorage.setItem('answersAudio', JSON.stringify(answersAudioSaved));
    } else {
      const answersAudioRight = this.result.rightAnswerWords.map((answer) => {
        const answerSaved = { [Object.keys(answer)[0]]: '1' };
        return answerSaved;
      });
      const answersAudioWrong = this.result.wrongAnswerWords.map((answer) => {
        const answerSaved = Object.keys(answer)[0];
        return answerSaved;
      });

      const answersAudioNew = {
        [currentDate]: {
          answersAudioRight,
          answersAudioWrong,
        },
      };
      localStorage.setItem('answersAudio', JSON.stringify(answersAudioNew));
    }
  }

  answerAudioGame(target: HTMLElement): void {
    if (!target.id.includes('audioGameAnswer')
      || target.classList.contains('button_disabled')) return;

    const currentWord = this.currentWord.word;
    const selectedWord = target.id.split('-')[1];
    const currentWordAnswer = { [currentWord]: this.currentWord.wordTranslate };

    if (currentWord === selectedWord) {
      this.result.rightAnswers += 1;
      this.result.rightAnswerWords.push(currentWordAnswer);
      target.classList.add('button__audio-game-answer_right');
    } else {
      this.result.wrongAnswerWords.push(currentWordAnswer);
      target.classList.add('button__audio-game-answer_wrong');
      const currentWordElement = document.querySelector(`#audioGameAnswer-${currentWord}`);
      if (currentWordElement) currentWordElement.classList.add('button__audio-game-answer_right');
    }
    this.currentWordIndex += 1;

    if (this.currentWordIndex >= this.pickedWords.length) {
      this.saveAudioAnswers();
      this.result.render();
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
