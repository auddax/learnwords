/* eslint-disable no-console */
import environment from '../../../environment/environment';
import { GAMES } from '../../../types/enums';
import { IAudioChallengeGame, IGameResult, IWords } from '../../../types/interfaces';
import { pickRandomItems } from '../../../utils/utils';
import GameResult from '../../GameResult/gameResult';

class AudioChallengeGame implements IAudioChallengeGame {
  currentWordIndex: number;

  score: number;

  gameType: GAMES;

  words: IWords[];

  pickedWords: IWords[];

  result: IGameResult;

  constructor(gameType: GAMES) {
    this.currentWordIndex = environment.wordsIndexDefault;
    this.score = environment.scoreDefault;
    this.gameType = gameType;
    this.words = [];
    this.pickedWords = [];
    this.result = new GameResult(this.gameType);
  }

  listen(target: HTMLElement) {
    this.answerAudioGame(target);
  }

  start(words: IWords[]) {
    this.score = environment.scoreDefault;
    this.words = words;
    this.pickedWords = pickRandomItems(this.words, environment.audioWordsNumber);
    this.render();
  }

  generateAnswerWords(): IWords[] {
    const currentWord = this.pickedWords[this.currentWordIndex];
    const filteredWords = this.words.filter((item) => item.id !== currentWord.id);
    const answerWords = pickRandomItems(filteredWords, environment.audioAnswersNumber);
    answerWords.push(currentWord);
    return answerWords;
  }

  answerAudioGame(target: HTMLElement): void {
    if (!target.id.includes('audioGameAnswer')) return;
    const currentWord = this.pickedWords[this.currentWordIndex].word;
    const selectedWord = target.id.split('-')[1];
    if (currentWord === selectedWord) this.score += environment.scoreIncrement;
    this.currentWordIndex += 1;
    if (this.currentWordIndex >= this.pickedWords.length) this.result.render(this.score);
    this.render();
  }

  render() {
    const currentWord = this.pickedWords[this.currentWordIndex];
    const classPrefix = this.gameType.toLowerCase();
    const answers = this.generateAnswerWords().map((item, index) => `
      <button type="button" class="button" id="audioGameAnswer-${item.word}">
        ${index + 1}. ${item.wordTranslate}
      </button>
    `).join('');
    const main = document.querySelector('.page-content');
    if (main) {
      main.innerHTML = `
        <section class="${classPrefix}-game">
          <div class="${classPrefix}-game__card">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
                <path d="M28 41.45v-3.1q4.85-1.4 7.925-5.375T39 23.95q0-5.05-3.05-9.05-3.05-4-7.95-5.35v-3.1q6.2 1.4 10.1 6.275Q42 17.6 42 23.95t-3.9 11.225Q34.2 40.05 28 41.45ZM6 30V18h8L24 8v32L14 30Zm21 2.4V15.55q2.75.85 4.375 3.2T33 24q0 2.85-1.65 5.2T27 32.4Zm-6-16.8L15.35 21H9v6h6.35L21 32.45ZM16.3 24Z"/>
              </svg>
              <audio autoplay>
                <source src="${environment.baseUrl}/${currentWord.audio}" type="audio/mpeg">
              </audio>            
            </div>
            <div class="${classPrefix}-game__result">
              Score: ${String(this.score)}
            </div>
            <form>
              ${answers}
            </form>
          </div>
        </section>
      `;
    }
  }
}

export default AudioChallengeGame;
