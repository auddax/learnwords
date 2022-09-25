/* eslint-disable no-console */
import environment from '../../environment/environment';
import { IStatistics, IWords } from '../../types/interfaces';
import { progressBar } from '../../utils/utils';
import './statistics.scss';

class Statistics implements IStatistics {
  newWordsToday: number;

  learnedWordsToday: number;

  accuracyToday: number;

  newWordsAudioToday: number;

  newWordsSprintToday: number;

  learnedWordsAudioToday: number;

  learnedWordsSprintToday: number;

  audioAccuracyToday: number;

  sprintAccuracyToday: number;

  constructor() {
    this.newWordsToday = environment.wordsStatisticsDefault;
    this.learnedWordsToday = environment.wordsStatisticsDefault;
    this.accuracyToday = environment.wordsStatisticsDefault;
    this.newWordsAudioToday = environment.wordsStatisticsDefault;
    this.newWordsSprintToday = environment.wordsStatisticsDefault;
    this.learnedWordsAudioToday = environment.wordsStatisticsDefault;
    this.learnedWordsSprintToday = environment.wordsStatisticsDefault;
    this.audioAccuracyToday = environment.wordsStatisticsDefault;
    this.sprintAccuracyToday = environment.wordsStatisticsDefault;
  }

  getLocalAnswers() {
    const answersAudio = localStorage.getItem('answersAudio');
    const answersSprint = localStorage.getItem('answersSprint');
    const currentDate = new Date().toJSON().slice(0, 10);
    let rightAnswersNumberAudio = 0;
    let rightAnswersNumberSprint = 0;
    let wrongAnswersNumberAudio = 0;
    let wrongAnswersNumberSprint = 0;

    if (answersAudio) {
      const answersAudioToday = JSON.parse(answersAudio)[currentDate];
      rightAnswersNumberAudio = answersAudioToday.answersAudioRight.length;
      wrongAnswersNumberAudio = answersAudioToday.answersAudioWrong.length;
      this.newWordsAudioToday = rightAnswersNumberAudio + wrongAnswersNumberAudio;

      const learnedWordsAudio = answersAudioToday.answersAudioRight.filter((word: IWords) => {
        const rightAnswers = Number(Object.values(word)[0]);
        return rightAnswers > 3;
      });

      this.learnedWordsAudioToday = learnedWordsAudio.length;

      this.audioAccuracyToday = Math.round(
        (answersAudioToday.answersAudioRight.length / this.newWordsAudioToday) * 100,
      );
    }

    if (answersSprint) {
      const answersSprintToday = JSON.parse(answersSprint)[currentDate];
      rightAnswersNumberSprint = answersSprintToday.answersSprintRight.length;
      wrongAnswersNumberSprint = answersSprintToday.answersSprintWrong.length;
      this.newWordsSprintToday = rightAnswersNumberSprint + wrongAnswersNumberSprint;

      const learnedWordsSprint = answersSprintToday.answersSprintRight.filter(
        (word: IWords) => {
          const rightAnswers = Number(Object.values(word)[0]);
          return rightAnswers > 3;
        },
      );
      this.learnedWordsSprintToday = learnedWordsSprint.length;

      this.sprintAccuracyToday = Math.round(
        (answersSprintToday.answersSprintRight.length / this.newWordsSprintToday) * 100,
      );
    }

    this.newWordsToday = this.newWordsAudioToday + this.newWordsSprintToday;
    this.learnedWordsToday = this.learnedWordsAudioToday + this.learnedWordsSprintToday;
    this.accuracyToday = Math.round(
      ((rightAnswersNumberAudio + rightAnswersNumberSprint) / this.newWordsToday) * 100,
    );
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
                <button type="button" class="button button-navbar">Today</button>
                <button type="button" class="button button-navbar">All period</button>
              </form>
            </header>
            <section class="card__content">
              <div class="card__column">
                <figure class="card__img">
                  <img src="./img/dictionary-card.svg" alt="Dictionary">
                </figure>
                <p class="card__words">${this.newWordsToday} слов</p>
                <p class="card__words">${this.learnedWordsToday} слов изучено</p>
                <h3 class="card__subheader">Ответы</h3>
                <div class="card__circular-progress">
                  <div class="circular-progress" id="circularProgressAllWords">
                    <div class="value-container" id="valueContainerAllWords">${this.accuracyToday}%</div>
                  </div>
                </div>  
              </div>
              <div class="card__column">
                <figure class="card__img">
                  <img src="./img/audio-challenge-game-logo.svg" alt="Headphones">
                </figure>
                <p class="card__words">${this.newWordsAudioToday} слов</p>
                <p class="card__words">${this.learnedWordsAudioToday} слов изучено</p>
                <h3 class="card__subheader">Ответы</h3>
                <div class="card__circular-progress">
                  <div class="circular-progress" id="circularProgressAudio">
                    <div class="value-container" id="valueContainerAudio">${this.audioAccuracyToday}%</div>
                  </div>
                </div>
              </div>
              <div class="card__column">
                <figure class="card__img">
                  <img src="./img/sprint-game-logo.svg" alt="Brain">
                </figure>
                <p class="card__words">${this.newWordsSprintToday} слов</p>
                <p class="card__words">${this.learnedWordsSprintToday} слов изучено</p>
                <h3 class="card__subheader">Ответы</h3>
                <div class="card__circular-progress">
                  <div class="circular-progress" id="circularProgressSprint">
                    <div class="value-container" id="valueContainerSprint">${this.sprintAccuracyToday}%</div>
                  </div>
                </div>
              </div>
            </section>
          </article>
        </section>
      `;
    }

    const barAll = document.getElementById('circularProgressAllWords') as HTMLElement;
    const valueAll = document.getElementById('valueContainerAllWords') as HTMLElement;
    if (this.accuracyToday) progressBar(barAll, valueAll, this.accuracyToday);

    const barAudio = document.getElementById('circularProgressAudio') as HTMLElement;
    const valueAudio = document.querySelector('valueContainerAudio') as HTMLElement;
    if (this.audioAccuracyToday) progressBar(barAudio, valueAudio, this.audioAccuracyToday);

    const barSprint = document.getElementById('circularProgressSprint') as HTMLElement;
    const valueSprint = document.querySelector('valueContainerSprint') as HTMLElement;
    if (this.sprintAccuracyToday) progressBar(barSprint, valueSprint, this.sprintAccuracyToday);
  }
}

export default Statistics;
