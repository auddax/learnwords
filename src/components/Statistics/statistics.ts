/* eslint-disable no-console */
import environment from '../../environment/environment';
import { DIFFICULTY, PATH, STATISTICS } from '../../types/enums';
import { IResponseWords, IStatistics, IWords } from '../../types/interfaces';
import { progressBar } from '../../utils/utils';
import Loader from '../Loader/loader';
import './statistics.scss';

class Statistics extends Loader implements IStatistics {
  view: STATISTICS;

  userId: string | null;

  newWords: number;

  learnedWords: number;

  accuracy: number;

  newWordsAudio: number;

  newWordsSprint: number;

  learnedWordsAudio: number;

  learnedWordsSprint: number;

  accuracyAudio: number;

  accuracySprint: number;

  constructor() {
    super();
    this.view = STATISTICS.TODAY;
    this.userId = localStorage.getItem('userId');
    this.newWords = environment.wordsStatisticsDefault;
    this.learnedWords = environment.wordsStatisticsDefault;
    this.accuracy = environment.wordsStatisticsDefault;
    this.newWordsAudio = environment.wordsStatisticsDefault;
    this.newWordsSprint = environment.wordsStatisticsDefault;
    this.learnedWordsAudio = environment.wordsStatisticsDefault;
    this.learnedWordsSprint = environment.wordsStatisticsDefault;
    this.accuracyAudio = environment.wordsStatisticsDefault;
    this.accuracySprint = environment.wordsStatisticsDefault;
  }

  listen(target: HTMLElement): void {
    this.changeView(target);
  }

  listenStorage(key: string | null) {
    const view = localStorage.getItem('rsview');
    if (key === 'userName') {
      this.userId = localStorage.getItem('userId');
      if (view === 'statistics') this.render();
    }
  }

  changeView(target: HTMLElement): void {
    if (target.id === 'statisticsToday') {
      this.view = STATISTICS.TODAY;
      this.render();
    }
    if (target.id === 'statisticsAll') {
      this.view = STATISTICS.ALL;
      this.render();
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

  getLocalAnswers(): void {
    const answersAudio = localStorage.getItem('answersAudio');
    const answersSprint = localStorage.getItem('answersSprint');
    const currentDate = new Date().toJSON().slice(0, 10);
    this.newWords = environment.wordsStatisticsDefault;
    this.learnedWords = environment.wordsStatisticsDefault;
    this.accuracy = environment.wordsStatisticsDefault;
    this.newWordsAudio = environment.wordsStatisticsDefault;
    this.newWordsSprint = environment.wordsStatisticsDefault;
    this.learnedWordsAudio = environment.wordsStatisticsDefault;
    this.learnedWordsSprint = environment.wordsStatisticsDefault;
    this.accuracyAudio = environment.wordsStatisticsDefault;
    this.accuracySprint = environment.wordsStatisticsDefault;

    let rightAnswersNumberAudio = 0;
    let rightAnswersNumberSprint = 0;
    let wrongAnswersNumberAudio = 0;
    let wrongAnswersNumberSprint = 0;

    if (answersAudio) {
      if (this.view === STATISTICS.TODAY) {
        const answersAudioToday = JSON.parse(answersAudio)[currentDate];

        this.newWordsAudio = environment.wordsStatisticsDefault;
        this.learnedWordsAudio = environment.wordsStatisticsDefault;
        this.accuracyAudio = environment.wordsStatisticsDefault;

        if (answersAudioToday) {
          rightAnswersNumberAudio = answersAudioToday.answersRight.length;
          wrongAnswersNumberAudio = answersAudioToday.answersWrong.length;
          this.newWordsAudio = rightAnswersNumberAudio + wrongAnswersNumberAudio;

          const learnedWordsAudio = answersAudioToday.answersRight.filter((word: IWords) => {
            const rightAnswers = Number(Object.values(word)[0]);
            return rightAnswers >= environment.wordsStatisticsLearned;
          });

          this.learnedWordsAudio = learnedWordsAudio.length;

          this.accuracyAudio = Math.round(
            (rightAnswersNumberAudio / this.newWordsAudio) * 100,
          );
        }
      } else {
        const answersAudioAll = JSON.parse(answersAudio);
        const rightAnswersAudio: IWords[] = [];
        const wrongAnswersAudio: string[] = [];
        Object.keys(answersAudioAll).forEach((date) => {
          rightAnswersAudio.push(...answersAudioAll[date].answersRight);
          wrongAnswersAudio.push(...answersAudioAll[date].answersWrong);
        });
        rightAnswersNumberAudio = rightAnswersAudio.length;
        wrongAnswersNumberAudio = wrongAnswersAudio.length;
        this.newWordsAudio = rightAnswersNumberAudio + wrongAnswersNumberAudio;

        const learnedWordsAudio = rightAnswersAudio.filter((word: IWords) => {
          const rightAnswers = Number(Object.values(word)[0]);
          return rightAnswers >= environment.wordsStatisticsLearned;
        });

        this.learnedWordsAudio = learnedWordsAudio.length;

        this.accuracyAudio = Math.round(
          (rightAnswersNumberAudio / this.newWordsAudio) * 100,
        );
      }
    }

    if (answersSprint) {
      if (this.view === STATISTICS.TODAY) {
        const answersSprintToday = JSON.parse(answersSprint)[currentDate];

        this.newWordsSprint = environment.wordsStatisticsDefault;
        this.learnedWordsSprint = environment.wordsStatisticsDefault;
        this.accuracySprint = environment.wordsStatisticsDefault;

        if (answersSprintToday) {
          rightAnswersNumberSprint = answersSprintToday.answersRight.length;
          wrongAnswersNumberSprint = answersSprintToday.answersWrong.length;
          this.newWordsSprint = rightAnswersNumberSprint + wrongAnswersNumberSprint;

          const learnedWordsSprint = answersSprintToday.answersRight.filter(
            (word: IWords) => {
              const rightAnswers = Number(Object.values(word)[0]);
              return rightAnswers >= environment.wordsStatisticsLearned;
            },
          );

          this.learnedWordsSprint = learnedWordsSprint.length;

          this.accuracySprint = Math.round(
            (rightAnswersNumberSprint / this.newWordsSprint) * 100,
          );
        }
      } else {
        const answersSprintAll = JSON.parse(answersSprint);
        const rightAnswersSprint: IWords[] = [];
        const wrongAnswersSprint: string[] = [];
        Object.keys(answersSprintAll).forEach((date) => {
          rightAnswersSprint.push(...answersSprintAll[date].answersRight);
          wrongAnswersSprint.push(...answersSprintAll[date].answersWrong);
        });
        rightAnswersNumberSprint = rightAnswersSprint.length;
        wrongAnswersNumberSprint = wrongAnswersSprint.length;
        this.newWordsSprint = rightAnswersNumberSprint + wrongAnswersNumberSprint;

        const learnedWordsSprint = rightAnswersSprint.filter((word: IWords) => {
          const rightAnswers = Number(Object.values(word)[0]);
          return rightAnswers >= environment.wordsStatisticsLearned;
        });

        this.learnedWordsSprint = learnedWordsSprint.length;

        this.accuracySprint = Math.round(
          (rightAnswersNumberSprint / this.newWordsSprint) * 100,
        );
      }
    }

    this.newWords = this.newWordsAudio + this.newWordsSprint;
    this.learnedWords = this.learnedWordsAudio + this.learnedWordsSprint;
    if (rightAnswersNumberAudio || rightAnswersNumberSprint) {
      this.accuracy = Math.round(
        ((rightAnswersNumberAudio + rightAnswersNumberSprint) / this.newWords) * 100,
      );
    }
  }

  async getServerAnswers(): Promise<void> {
    const userWords = await this.getUserWords();
    const answersAudio = userWords.filter((word) => 'audio' in word.optional);
    const answersSprint = userWords.filter((word) => 'sprint' in word.optional);
    const currentDate = new Date().toJSON().slice(0, 10);
    this.newWords = environment.wordsStatisticsDefault;
    this.learnedWords = environment.wordsStatisticsDefault;
    this.accuracy = environment.wordsStatisticsDefault;
    let rightAnswersNumberAudio = 0;
    let rightAnswersNumberSprint = 0;

    if (answersAudio.length > 0) {
      if (this.view === STATISTICS.TODAY) {
        const answersAudioToday = answersAudio.filter((word) => {
          const date = word.optional.dateAdd;
          return date === currentDate;
        });

        this.newWordsAudio = environment.wordsStatisticsDefault;
        this.learnedWordsAudio = environment.wordsStatisticsDefault;
        this.accuracyAudio = environment.wordsStatisticsDefault;

        if (answersAudioToday.length > 0) {
          rightAnswersNumberAudio = answersAudioToday.filter((word) => {
            const answers = word.optional.audio;
            return Number(answers) > 0;
          }).length;
          this.newWordsAudio = answersAudioToday.length;

          const learnedWordsAudio = answersAudioToday.filter((word) => {
            const { difficulty } = word;
            return difficulty === DIFFICULTY.LEARNED;
          });

          this.learnedWordsAudio = learnedWordsAudio.length;

          this.accuracyAudio = Math.round(
            (rightAnswersNumberAudio / this.newWordsAudio) * 100,
          );
        }
      } else {
        this.newWordsAudio = environment.wordsStatisticsDefault;
        this.learnedWordsAudio = environment.wordsStatisticsDefault;
        this.accuracyAudio = environment.wordsStatisticsDefault;

        if (answersAudio.length > 0) {
          rightAnswersNumberAudio = answersAudio.filter((word) => {
            const answers = word.optional.audio;
            return Number(answers) > 0;
          }).length;
          this.newWordsAudio = answersAudio.length;

          const learnedWordsAudio = answersAudio.filter((word) => {
            const { difficulty } = word;
            return difficulty === DIFFICULTY.LEARNED;
          });

          this.learnedWordsAudio = learnedWordsAudio.length;

          this.accuracyAudio = Math.round(
            (rightAnswersNumberAudio / this.newWordsAudio) * 100,
          );
        }
      }
    }

    if (answersSprint.length > 0) {
      if (this.view === STATISTICS.TODAY) {
        const answersSprintToday = answersSprint.filter((word) => {
          const date = word.optional.dateAdd;
          return date === currentDate;
        });

        this.newWordsSprint = environment.wordsStatisticsDefault;
        this.learnedWordsSprint = environment.wordsStatisticsDefault;
        this.accuracySprint = environment.wordsStatisticsDefault;

        if (answersSprintToday.length > 0) {
          rightAnswersNumberSprint = answersSprintToday.filter((word) => {
            const answers = word.optional.sprint;
            return Number(answers) > 0;
          }).length;
          this.newWordsSprint = answersSprintToday.length;

          const learnedWordsSprint = answersSprintToday.filter((word) => {
            const { difficulty } = word;
            return difficulty === DIFFICULTY.LEARNED;
          });

          this.learnedWordsSprint = learnedWordsSprint.length;

          this.accuracySprint = Math.round(
            (rightAnswersNumberSprint / this.newWordsSprint) * 100,
          );
        }
      } else {
        this.newWordsSprint = environment.wordsStatisticsDefault;
        this.learnedWordsSprint = environment.wordsStatisticsDefault;
        this.accuracySprint = environment.wordsStatisticsDefault;

        if (answersSprint.length > 0) {
          rightAnswersNumberSprint = answersSprint.filter((word) => {
            const answers = word.optional.sprint;
            return Number(answers) > 0;
          }).length;
          this.newWordsSprint = answersSprint.length;

          const learnedWordsSprint = answersSprint.filter((word) => {
            const { difficulty } = word;
            return difficulty === DIFFICULTY.LEARNED;
          });

          this.learnedWordsSprint = learnedWordsSprint.length;

          this.accuracySprint = Math.round(
            (rightAnswersNumberSprint / this.newWordsSprint) * 100,
          );
        }
      }
    }
  }

  async render() {
    localStorage.setItem('rsview', 'statistics');

    if (this.userId) {
      await this.getServerAnswers();
    } else {
      this.getLocalAnswers();
    }

    const main = document.querySelector('.page-content') as HTMLElement;
    if (main) {
      main.innerHTML = `
        <section class="statistics-page">
          <header class="statistics-page__header">
            <h1>Статистика</h1>
          </header>
          <article class="statistics-page__card">
            <header class="card__header">
              <form class="card__navbar">
                <button type="button" class="button button-navbar" id="statisticsToday">Today</button>
                <button type="button" class="button button-navbar" id="statisticsAll">All period</button>
              </form>
            </header>
            <section class="card__content">
              <div class="card__column">
                <figure class="card__img">
                  <img src="./img/dictionary-card.svg" alt="Dictionary">
                </figure>
                <p class="card__words">${this.newWords} слов</p>
                <p class="card__words">${this.learnedWords} слов изучено</p>
                <h3 class="card__subheader">Ответы</h3>
                <div class="card__circular-progress">
                  <div class="circular-progress" id="circularProgressAllWords">
                    <div class="value-container" id="valueContainerAllWords">${this.accuracy}%</div>
                  </div>
                </div>  
              </div>
              <div class="card__column">
                <figure class="card__img">
                  <img src="./img/audio-challenge-game-logo.svg" alt="Headphones">
                </figure>
                <p class="card__words">${this.newWordsAudio} слов</p>
                <p class="card__words">${this.learnedWordsAudio} слов изучено</p>
                <h3 class="card__subheader">Ответы</h3>
                <div class="card__circular-progress">
                  <div class="circular-progress" id="circularProgressAudio">
                    <div class="value-container" id="valueContainerAudio">${this.accuracyAudio}%</div>
                  </div>
                </div>
              </div>
              <div class="card__column">
                <figure class="card__img">
                  <img src="./img/sprint-game-logo.svg" alt="Brain">
                </figure>
                <p class="card__words">${this.newWordsSprint} слов</p>
                <p class="card__words">${this.learnedWordsSprint} слов изучено</p>
                <h3 class="card__subheader">Ответы</h3>
                <div class="card__circular-progress">
                  <div class="circular-progress" id="circularProgressSprint">
                    <div class="value-container" id="valueContainerSprint">${this.accuracySprint}%</div>
                  </div>
                </div>
              </div>
            </section>
          </article>
        </section>
      `;
    }

    if (this.view === STATISTICS.TODAY) {
      document.getElementById('statisticsToday')?.classList.add('button-navbar_selected');
    } else {
      document.getElementById('statisticsAll')?.classList.add('button-navbar_selected');
    }

    const barAll = document.getElementById('circularProgressAllWords') as HTMLElement;
    const valueAll = document.getElementById('valueContainerAllWords') as HTMLElement;
    if (this.accuracy) progressBar(barAll, valueAll, this.accuracy);

    const barAudio = document.getElementById('circularProgressAudio') as HTMLElement;
    const valueAudio = document.querySelector('valueContainerAudio') as HTMLElement;
    if (this.accuracyAudio) progressBar(barAudio, valueAudio, this.accuracyAudio);

    const barSprint = document.getElementById('circularProgressSprint') as HTMLElement;
    const valueSprint = document.querySelector('valueContainerSprint') as HTMLElement;
    if (this.accuracySprint) progressBar(barSprint, valueSprint, this.accuracySprint);
  }
}

export default Statistics;
