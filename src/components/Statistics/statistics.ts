/* eslint-disable no-console */
import environment from '../../environment/environment';
import { STATISTICS } from '../../types/enums';
import { IStatistics, IWords } from '../../types/interfaces';
import { progressBar } from '../../utils/utils';
import './statistics.scss';

class Statistics implements IStatistics {
  view: STATISTICS;

  newWords: number;

  learnedWords: number;

  accuracy: number;

  newWordsAudio: number;

  newWordsSprint: number;

  learnedWordsAudio: number;

  learnedWordsSprint: number;

  audioAccuracy: number;

  sprintAccuracy: number;

  constructor() {
    this.view = STATISTICS.TODAY;
    this.newWords = environment.wordsStatisticsDefault;
    this.learnedWords = environment.wordsStatisticsDefault;
    this.accuracy = environment.wordsStatisticsDefault;
    this.newWordsAudio = environment.wordsStatisticsDefault;
    this.newWordsSprint = environment.wordsStatisticsDefault;
    this.learnedWordsAudio = environment.wordsStatisticsDefault;
    this.learnedWordsSprint = environment.wordsStatisticsDefault;
    this.audioAccuracy = environment.wordsStatisticsDefault;
    this.sprintAccuracy = environment.wordsStatisticsDefault;
  }

  listen(target: HTMLElement): void {
    this.changeView(target);
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

  getLocalAnswers(): void {
    const answersAudio = localStorage.getItem('answersAudio');
    const answersSprint = localStorage.getItem('answersSprint');
    const currentDate = new Date().toJSON().slice(0, 10);
    this.newWords = environment.wordsStatisticsDefault;
    this.learnedWords = environment.wordsStatisticsDefault;
    this.accuracy = environment.wordsStatisticsDefault;
    let rightAnswersNumberAudio = 0;
    let rightAnswersNumberSprint = 0;
    let wrongAnswersNumberAudio = 0;
    let wrongAnswersNumberSprint = 0;

    if (answersAudio) {
      if (this.view === STATISTICS.TODAY) {
        const answersAudioToday = JSON.parse(answersAudio)[currentDate];

        this.newWordsAudio = environment.wordsStatisticsDefault;
        this.learnedWordsAudio = environment.wordsStatisticsDefault;
        this.audioAccuracy = environment.wordsStatisticsDefault;

        if (answersAudioToday) {
          rightAnswersNumberAudio = answersAudioToday.answersAudioRight.length;
          wrongAnswersNumberAudio = answersAudioToday.answersAudioWrong.length;
          this.newWordsAudio = rightAnswersNumberAudio + wrongAnswersNumberAudio;

          const learnedWordsAudio = answersAudioToday.answersAudioRight.filter((word: IWords) => {
            const rightAnswers = Number(Object.values(word)[0]);
            return rightAnswers > 3;
          });

          this.learnedWordsAudio = learnedWordsAudio.length;

          this.audioAccuracy = Math.round(
            (rightAnswersNumberAudio / this.newWordsAudio) * 100,
          );
        }
      } else {
        const answersAudioAll = JSON.parse(answersAudio);
        const rightAnswersAudio: IWords[] = [];
        const wrongAnswersAudio: string[] = [];
        Object.keys(answersAudioAll).forEach((date) => {
          rightAnswersAudio.push(...answersAudioAll[date].answersAudioRight);
          wrongAnswersAudio.push(...answersAudioAll[date].answersAudioWrong);
        });
        rightAnswersNumberAudio = rightAnswersAudio.length;
        wrongAnswersNumberAudio = wrongAnswersAudio.length;
        this.newWordsAudio = rightAnswersNumberAudio + wrongAnswersNumberAudio;

        const learnedWordsAudio = rightAnswersAudio.filter((word: IWords) => {
          const rightAnswers = Number(Object.values(word)[0]);
          return rightAnswers > 3;
        });

        this.learnedWordsAudio = learnedWordsAudio.length;

        this.audioAccuracy = Math.round(
          (rightAnswersNumberAudio / this.newWordsAudio) * 100,
        );
      }
    }

    if (answersSprint) {
      if (this.view === STATISTICS.TODAY) {
        const answersSprintToday = JSON.parse(answersSprint)[currentDate];

        this.newWordsSprint = environment.wordsStatisticsDefault;
        this.learnedWordsSprint = environment.wordsStatisticsDefault;
        this.sprintAccuracy = environment.wordsStatisticsDefault;

        if (answersSprintToday) {
          rightAnswersNumberSprint = answersSprintToday.answersSprintRight.length;
          wrongAnswersNumberSprint = answersSprintToday.answersSprintWrong.length;
          this.newWordsSprint = rightAnswersNumberSprint + wrongAnswersNumberSprint;

          const learnedWordsSprint = answersSprintToday.answersSprintRight.filter(
            (word: IWords) => {
              const rightAnswers = Number(Object.values(word)[0]);
              return rightAnswers > 3;
            },
          );

          this.learnedWordsSprint = learnedWordsSprint.length;

          this.sprintAccuracy = Math.round(
            (rightAnswersNumberSprint / this.newWordsSprint) * 100,
          );
        }
      } else {
        const answersSprintAll = JSON.parse(answersSprint);
        const rightAnswersSprint: IWords[] = [];
        const wrongAnswersSprint: string[] = [];
        Object.keys(answersSprintAll).forEach((date) => {
          rightAnswersSprint.push(...answersSprintAll[date].answersSprintRight);
          wrongAnswersSprint.push(...answersSprintAll[date].answersSprintWrong);
        });
        rightAnswersNumberSprint = rightAnswersSprint.length;
        wrongAnswersNumberSprint = wrongAnswersSprint.length;
        this.newWordsSprint = rightAnswersNumberSprint + wrongAnswersNumberSprint;

        const learnedWordsSprint = rightAnswersSprint.filter((word: IWords) => {
          const rightAnswers = Number(Object.values(word)[0]);
          return rightAnswers > 3;
        });

        this.learnedWordsSprint = learnedWordsSprint.length;

        this.sprintAccuracy = Math.round(
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

  render() {
    localStorage.setItem('rsview', 'statistics');
    this.getLocalAnswers();

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
                    <div class="value-container" id="valueContainerAudio">${this.audioAccuracy}%</div>
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
                    <div class="value-container" id="valueContainerSprint">${this.sprintAccuracy}%</div>
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
    if (this.audioAccuracy) progressBar(barAudio, valueAudio, this.audioAccuracy);

    const barSprint = document.getElementById('circularProgressSprint') as HTMLElement;
    const valueSprint = document.querySelector('valueContainerSprint') as HTMLElement;
    if (this.sprintAccuracy) progressBar(barSprint, valueSprint, this.sprintAccuracy);
  }
}

export default Statistics;
