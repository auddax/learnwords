/* eslint-disable no-console */
import {
  GAMES,
  PATH,
  RESULTS,
  DIFFICULTY,
  UPDATE,
} from '../../types/enums';
import {
  IGameResult,
  IOptional,
  IResponseWords,
  IWords,
} from '../../types/interfaces';
import environment from '../../environment/environment';
import { progressBar } from '../../utils/utils';
import Loader from '../Loader/loader';
import './gameResult.scss';

class GameResult extends Loader implements IGameResult {
  gameType: GAMES;

  userId: string | null;

  view: RESULTS;

  rightAnswers: string[];

  wrongAnswers: string[];

  learnedWords: number | null;

  totalWordsNumber: number;

  rightAnswerWords: IWords[];

  wrongAnswerWords: IWords[];

  constructor(gameType: GAMES) {
    super();
    this.gameType = gameType;
    this.userId = localStorage.getItem('userId');
    this.view = RESULTS.ACCURACY;
    this.rightAnswers = [];
    this.wrongAnswers = [];
    this.learnedWords = null;
    this.totalWordsNumber = gameType === GAMES.SPRINT
      ? environment.wordsNumber
      : environment.audioWordsNumber;
    this.rightAnswerWords = [];
    this.wrongAnswerWords = [];
  }

  saveAnswers(): void {
    if (this.userId) {
      this.saveAnswersServer();
    } else {
      this.saveAnswersLocal();
    }
  }

  saveAnswersLocal(): void {
    const currentDate = new Date().toJSON().slice(0, 10);
    const answers = localStorage.getItem(`answers${this.gameType}`);

    if (answers) {
      const answersSaved = JSON.parse(answers);
      if (currentDate in answersSaved) {
        const answersSavedToday = answersSaved[currentDate];
        const answersRightWords = this.rightAnswerWords.map((answer) => {
          const answerSaved = Object.keys(answer)[0];
          return answerSaved;
        });
        const answersWrongWords = this.wrongAnswerWords.map((answer) => {
          const answerSaved = Object.keys(answer)[0];
          return answerSaved;
        });

        const answersRight: IWords[] = [];
        const answersWrong: string[] = [];

        // Check saved right answers
        answersSavedToday.answersAudioRight.forEach((word: IWords) => {
          if (answersRightWords.includes(Object.keys(word)[0])) {
            answersRight.push({
              [Object.keys(word)[0]]: String(+Object.values(word)[0] + 1),
            });
          } else if (!answersWrongWords.includes(Object.keys(word)[0])) {
            answersRight.push(word);
          }
        });

        // Check saved wrong answers
        answersSavedToday.answersAudioWrong.forEach((word: string) => {
          if (!answersRightWords.includes(word)) {
            answersWrong.push(word);
          }
        });

        // Add new right answers
        answersRightWords.forEach((currentAnswer) => {
          if (answersRight.every((word: IWords) => Object.keys(word)[0] !== currentAnswer)) {
            answersRight.push({ [currentAnswer]: '1' });
          }
        });

        // Add new wrong answers
        answersWrong.push(...answersWrongWords);

        answersSaved[currentDate] = {
          answersRight,
          answersWrong,
        };
      } else {
        const answersRightWords = this.rightAnswerWords.map((answer) => {
          const answerSaved = Object.keys(answer)[0];
          return answerSaved;
        });

        const answersWrongWords = this.wrongAnswerWords.map((answer) => {
          const answerSaved = Object.keys(answer)[0];
          return answerSaved;
        });

        const answersRight: IWords[] = [];
        const answersWrong: string[] = [];

        Object.keys(answersSaved).forEach((date) => {
          // Check saved right answers
          answersSaved[date].answersAudioRight.forEach((word: IWords) => {
            if (answersRightWords.includes(Object.keys(word)[0])) {
              answersRight.push({
                [Object.keys(word)[0]]: String(+Object.values(word)[0] + 1),
              });
            } else if (!answersWrongWords.includes(Object.keys(word)[0])) {
              answersRight.push(word);
            }
          });

          // Check saved wrong answers
          answersSaved[date].answersAudioWrong.forEach((word: string) => {
            if (!answersRightWords.includes(word)) {
              answersWrong.push(word);
            }
          });
        });

        // Add new right answers
        answersRight.forEach((word: IWords) => {
          if (!answersRightWords.includes(Object.keys(word)[0])) {
            answersRight.push({ [Object.keys(word)[0]]: '1' });
          }
        });

        // Add new wrong answers
        answersWrong.push(...answersWrongWords);

        answersSaved[currentDate] = {
          answersRight,
          answersWrong,
        };
      }
      localStorage.setItem(`answers${this.gameType}`, JSON.stringify(answersSaved));
    } else {
      const answersRight = this.rightAnswerWords.map((answer) => {
        const answerSaved = { [Object.keys(answer)[0]]: '1' };
        return answerSaved;
      });
      const answersWrong = this.wrongAnswerWords.map((answer) => {
        const answerSaved = Object.keys(answer)[0];
        return answerSaved;
      });

      const answersAudioNew = {
        [currentDate]: {
          answersRight,
          answersWrong,
        },
      };
      localStorage.setItem(`answers${this.gameType}`, JSON.stringify(answersAudioNew));
    }
  }

  async saveAnswersServer(): Promise<void> {
    const userWords = await this.getUserWords();

    if (userWords.length > 0) {
      const savedRightWords: string[] = [];
      const savedWrongWords: string[] = [];

      userWords.forEach((word) => {
        if (this.rightAnswers.includes(word.wordId)) {
          savedRightWords.push(word.wordId);
        }
      });

      userWords.forEach((word) => {
        if (this.wrongAnswers.includes(word.wordId)) {
          savedWrongWords.push(word.wordId);
        }
      });

      const newRightWords = this.rightAnswers.filter((word) => !savedRightWords.includes(word));
      const newWrongWords = this.wrongAnswers.filter((word) => !savedWrongWords.includes(word));

      savedRightWords.forEach(async (wordId) => {
        await this.updateUserWord(wordId);
      });

      newRightWords.forEach(async (wordId) => {
        await this.setUserWord(wordId);
      });

      savedWrongWords.forEach(async (wordId) => {
        await this.updateUserWord(wordId, UPDATE.DOWNSCORE);
      });

      newWrongWords.forEach(async (wordId) => {
        await this.setUserWord(wordId, UPDATE.DOWNSCORE);
      });
    } else {
      this.rightAnswers.forEach(async (wordId) => {
        await this.setUserWord(wordId);
      });
      this.wrongAnswers.forEach(async (wordId) => {
        await this.setUserWord(wordId, UPDATE.DOWNSCORE);
      });
    }
  }

  async getUserWords(): Promise<IResponseWords[]> {
    const userToken = localStorage.getItem('userToken');
    const pathVars = {
      [PATH.USERS]: this.userId,
      [PATH.WORDS]: null,
    };

    const myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Authorization', `Bearer ${userToken}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    const params = { pathVars };
    const response = await super.getResponse(params, requestOptions);
    const words = await response.json();
    return words;
  }

  async setUserWord(wordId: string, update = UPDATE.UPSCORE): Promise<void> {
    const userToken = localStorage.getItem('userToken');
    const currentDate = new Date().toJSON().slice(0, 10);
    const pathVars = {
      [PATH.USERS]: this.userId,
      [PATH.WORDS]: wordId,
    };

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Authorization', `Bearer ${userToken}`);

    const optional: IOptional = {
      dateAdd: currentDate,
    };

    if (this.gameType === GAMES.AUDIO) {
      if (update === UPDATE.DOWNSCORE) {
        optional.audio = environment.wordsStatisticsDefault;
      } else {
        optional.audio = 1;
      }
    } else if (update === UPDATE.DOWNSCORE) {
      optional.sprint = environment.wordsStatisticsDefault;
    } else {
      optional.sprint = 1;
    }

    const raw = JSON.stringify({
      difficulty: DIFFICULTY.NORMAL,
      optional,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    const params = { pathVars };
    await super.getResponse(params, requestOptions);
  }

  async updateUserWord(wordId: string, update = UPDATE.UPSCORE): Promise<void> {
    const userToken = localStorage.getItem('userToken');
    const word = await this.getUserWord(wordId);
    const currentDate = new Date().toJSON().slice(0, 10);
    const pathVars = {
      [PATH.USERS]: this.userId,
      [PATH.WORDS]: wordId,
    };

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Authorization', `Bearer ${userToken}`);

    const optional: IOptional = {
      dateAdd: word.optional.dateAdd,
    };

    if (this.gameType === GAMES.AUDIO) {
      if (update === UPDATE.DOWNSCORE) {
        optional.audio = environment.wordsStatisticsDefault;
        if (word.optional.sprint) optional.sprint = word.optional.sprint;
      } else if (word.optional.audio) {
        optional.audio = word.optional.audio + 1;
      } else {
        optional.audio = 1;
      }
    } else if (update === UPDATE.DOWNSCORE) {
      optional.sprint = environment.wordsStatisticsDefault;
      if (word.optional.audio) optional.audio = word.optional.audio;
    } else if (word.optional.sprint) {
      optional.sprint = word.optional.sprint + 1;
    } else {
      optional.sprint = 1;
    }

    const difficulty = (
      ((optional.audio && optional.audio >= environment.wordsStatisticsLearned)
        || (optional.sprint && optional.sprint >= environment.wordsStatisticsLearned)
      ) && (optional.audio !== environment.wordsStatisticsDefault
      || optional.sprint !== environment.wordsStatisticsDefault)
    ) ? DIFFICULTY.LEARNED : DIFFICULTY.NORMAL;

    if (difficulty === DIFFICULTY.LEARNED) optional.dateLearned = currentDate;

    const raw = JSON.stringify({
      difficulty,
      optional,
    });

    const requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
    };

    const params = { pathVars };
    await super.getResponse(params, requestOptions);
  }

  async getUserWord(wordId: string): Promise<IResponseWords> {
    const userToken = localStorage.getItem('userToken');
    const pathVars = {
      [PATH.USERS]: this.userId,
      [PATH.WORDS]: wordId,
    };

    const myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Authorization', `Bearer ${userToken}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    const params = { pathVars };
    const response = await super.getResponse(params, requestOptions);
    const word = await response.json();
    return JSON.parse(word);
  }

  async getStatistics(headers: Headers) {
    const requestOptions = {
      method: 'PUT',
      headers,
    };

    const pathVars = {
      [PATH.USERS]: this.userId,
      [PATH.STATISTIC]: null,
    };

    const params = { pathVars };
    const response = await super.getResponse(params, requestOptions);
    const content = await response.json();
    return content;
  }

  async setStatistics(headers: Headers) {
    const raw = JSON.stringify({
      learnedWords: this.learnedWords,
      optional: {},
    });

    const requestOptions = {
      method: 'PUT',
      headers,
      body: raw,
    };

    const pathVars = {
      [PATH.USERS]: this.userId,
      [PATH.STATISTIC]: null,
    };
    const params = { pathVars };
    await super.getResponse(params, requestOptions);
  }

  async updateStatistics() {
    const userToken = localStorage.getItem('userToken');

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Authorization', `Bearer ${userToken}`);

    const statistics = await this.getStatistics(myHeaders);
    this.learnedWords = statistics.learnedWords;
  }

  changeView(target: HTMLElement): void {
    if (!target.classList.contains(`game-${this.gameType.toLowerCase()}`)) return;
    if (target.id === 'gameAccuracyCard') {
      this.view = RESULTS.ACCURACY;
      this.render();
    }
    if (target.id === 'gameWordsCard') {
      this.view = RESULTS.WORDS;
      this.render();
    }
  }

  render() {
    const main = document.querySelector('.page-content') as HTMLElement;

    const cardContentAccuracy = `
      <div class="card__content">
        <div class="content__results">
          <h2>${this.rightAnswers.length} слов изучено</h2>
          <h2>${(this.totalWordsNumber - this.rightAnswers.length)} слов на изучении</h2>
        </div>
      </div>
      <div class="card__circular-progress">
        <div class="circular-progress">
          <div class="value-container">0%</div>
        </div>
      </div>
    `;

    const cardContentWords = `
      <div class="card__content">
        <div class="content__answers">
          <div class="answers">
            <h2 class="answers__header">Знаю</h2>
            <ul class="answers__words">
              ${this.rightAnswerWords.map((item) => `<li>${Object.entries(item).flat().join(' - ')}</li>`).join('')}
            </ul>
          </div>
          <div class="answers">
            <h2 class="answers__header">Ошибки</h2>
            <ul class="answers__words">
              ${this.wrongAnswerWords.map((item) => `<li>${Object.entries(item).flat().join(' - ')}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    `;

    if (main) {
      main.innerHTML = `
        <section class="game-result">
          <article class="game-result__card">
            <header class="card__header">
              <form class="card__navbar">
                <button type="button" class="button button-navbar game-${this.gameType.toLowerCase()}" id="gameAccuracyCard">Результаты</button>
                <button type="button" class="button button-navbar game-${this.gameType.toLowerCase()}" id="gameWordsCard">Мои слова</button>
              </form>
            </header>
            ${this.view === RESULTS.ACCURACY ? cardContentAccuracy : cardContentWords}
          </article>
          <form class="game-result__form">
            <button type="button" class="button" id="new${this.gameType}Game">Изменить уровень</button>
            <button type="button" class="button" id="start${this.gameType}Game">Попробовать снова</button>
          </form>
        </section>
      `;
    }

    if (this.view === RESULTS.ACCURACY) {
      document.getElementById('gameAccuracyCard')?.classList.add('button-navbar_selected');
    } else {
      document.getElementById('gameWordsCard')?.classList.add('button-navbar_selected');
    }

    const bar = document.querySelector('.circular-progress') as HTMLElement;
    const value = document.querySelector('.value-container') as HTMLElement;
    const accuracy = (this.rightAnswers.length / this.totalWordsNumber) * 100;
    if (accuracy) progressBar(bar, value, accuracy);
  }
}

export default GameResult;
