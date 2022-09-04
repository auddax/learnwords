/* eslint-disable max-lines-per-function */
/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { PATH } from '../../types/enums';
import { IAudioChallenge, IDictionaryPage, ISprint } from '../../types/interfaces';
import environment from '../../environment/environment';
import Loader from '../Loader/loader';
import Sprint from '../Sprint/sprint';
import AudioChallenge from '../AudioChallenge/audioChallenge';
import { classToggler } from '../../utils/utils';
import './dictionaryPage.scss';

class DictionaryPage extends Loader implements IDictionaryPage {
  base: string;

  audio: IAudioChallenge;

  sprint: ISprint;

  constructor() {
    super();
    this.base = environment.baseUrl;
    this.audio = new AudioChallenge();
    this.sprint = new Sprint();
  }

  async render() {
    const mainBlock = document.querySelector('.page-content');
    if (mainBlock) {
      mainBlock.innerHTML = `
      <section class="dictionary container">
        <header class="dictionary-header">
          <h1 class="dictionary-title">Dictionary</h1>
          <div class="dictionary-controls">
            <div class="controls-complexity">
              <h2 class="complexity-title">Select Level</h2>
              <div class="complexity-controls">
                <button type="button" id="1 1-0" class="complexity-a1 controls-level complexity choosen-complexity-1 choosen-complexity">A1</button>
                <button type="button" id="2 2-1" class="complexity-a2 complexity controls-level">A2</button>
                <button type="button" id="3 3-2" class="complexity-b1 complexity controls-level">
                  B1</button>
                <button type="button" id="4 4-3" class="complexity-b2 complexity controls-level">B2</button>
                <button type="button" id="5 5-4" class="complexity-c1 complexity controls-level">C1</button>
                <button type="button" id="6 6-5" class="complexity-c2 complexity controls-level">C2</button>
              </div>
            </div>
            <div class="links-card audioChallengeGameCard">
              <img class="audioChallengeGameCard card-img" src="./img/audio-challenge-game-logo.svg">
              <h2 class="audioChallengeGameCard card-header">Audio Challenge</h2>
            </div>
            <div class="links-card sprintGameCard">
              <img class="sprintGameCard card-img" src="./img//sprint-game-logo.svg">
              <h2 class="sprintGameCard card-header">Sprint</h2>
            </div>
          </div>
        </header>
        <section class="dictionary-words">
          <div class="words">
          </div>
          <div class="words-info">
          </div>
        </section>
        <section class="dictionary-pagination">
          <button class="button-pagination prev-page">
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.67 3.77L15.9 2L6 11.9L15.9 21.8L17.67 20.03L9.54 11.9L17.67 3.77Z"/>
            </svg>
          </button>
          <div class="pagination-current">
            <p id="0" class="current-page">1/30</p>
          </div>
          <button class="button-pagination next-page">
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.33 3.77L8.1 2L18 11.9L8.1 21.8L6.33 20.03L14.46 11.9L6.33 3.77Z"/>
            </svg>
          </button>
        </section>
      </section>
      `;
      if (localStorage.page || localStorage.group) {
        const currentPage = Number(localStorage.page);
        const currentGroup = Number(localStorage.group);
        this.setWordCard(currentPage, currentGroup);
        this.updatePageAndGroup(currentPage, currentGroup);
      } else {
        this.setWordCard();
      }
    }
  }

  async setWordCard(currentPage = 0, currentGroup = 0) {
    const wordsOnpage = await this.getWords(currentGroup, currentPage);
    const wordsBlock = document.querySelector('.words');
    if (wordsBlock) {
      wordsBlock!.innerHTML = ' ';
    }
    const FIRSTPAGE = 0;
    for (let i = 0; i < wordsOnpage.length; i += 1) {
      const renderedWordBlock = this.renderWordCard(wordsOnpage[i].word, wordsOnpage[i].wordTranslate, wordsOnpage[i].id);
      wordsBlock!.append(renderedWordBlock);
      if (i === FIRSTPAGE) {
        this.setWordInfo(wordsOnpage[i].id);
      }
    }
    // ниже идет выключение кнопкок пагинации если пользователь на первой/последней странице
    const currentPageBlock = document.querySelector('.current-page');
    if (currentPageBlock!.id === '0') {
      const prevBtn: HTMLButtonElement | null = document.querySelector('.prev-page');
      prevBtn!.disabled = true;
      prevBtn?.classList.add('disabled-btn');
    } else if (currentPageBlock!.id === '29') {
      const nextBtn: HTMLButtonElement | null = document.querySelector('.next-page');
      nextBtn!.disabled = true;
      nextBtn?.classList.add('disabled-btn');
    }
  }

  async setWordInfo(wordId: string) {
    const wordParams = await this.getWordById(wordId);
    const wordInfoBlock = document.querySelector('.words-info');
    wordInfoBlock!.innerHTML = `
            <div class="word-img">
              <img src="${this.base}/${wordParams.image}" alt="">
            </div>
            <div class="word-info-content">
              <div class="word-english">
                <p>${wordParams.word}</p>
              </div>
              <div class="word-translate">
                <p>${wordParams.wordTranslate}</p>
              </div>
              <div class="word-transcript">
                <p>${wordParams.transcription}</p>
                <div class="volume-img">
                  <svg class="button" id="turnAudioOn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path>
                  </svg>
                  <audio class="audioWordSound">
                    <source src="${environment.baseUrl}/${wordParams.audio}" type="audio/mpeg">
                  </audio>
                  <div id="${wordId}" class="volume-button"></div>
                </div>
              </div>
            <div class="word-mean">
              <h3 class="word-mean-title">Meaning</h3>
              <p class="word-mean-english">${wordParams.textMeaning}</p>
              <p class="word-mean-translate">
              ${wordParams.textMeaningTranslate}
              </p>
            </div>
            <div class="word-examples">
              <h3 class="word-example-title">Examples</h3>
              <p class="word-example-english">
              ${wordParams.textExample}
              </p>
              <p class="word-example-translate">
              ${wordParams.textExampleTranslate}
              </p>
            </div>
          </div>
    `;
    const prevChoosenWord = document.querySelector('.choosen-word');
    prevChoosenWord?.classList.remove('choosen-word');
    const wordBlock = document.getElementById(wordId);
    wordBlock!.classList.add('choosen-word');
  }

  renderWordCard(wordEnglish: string, wordTranslate: string, wordBlockId: string) {
    const wordCard = document.createElement('div');
    wordCard.classList.add('word', 'wordElement');
    wordCard.setAttribute('id', `${wordBlockId}`);
    wordCard.innerHTML = `
    <p id="${wordBlockId}" class="english-word wordElement">${wordEnglish}</p>
    <p id="${wordBlockId}"class="translate-word wordElement">${wordTranslate}</p>
    `;
    return wordCard;
  }

  async turnAudioOn(target: HTMLElement) {
    if (target.classList.contains('volume-button')) {
      const volumeBtn: HTMLDivElement | null = document.querySelector('.volume-button');
      if (volumeBtn?.style.display === '' || volumeBtn?.style.display === 'block') {
        volumeBtn!.style.display = 'none';
        const wordParams = await this.getWordById(target.id);
        const wordAudio = new Audio();
        wordAudio.src = `${this.base}/${wordParams.audio}`;
        wordAudio.autoplay = true;
        wordAudio.addEventListener('ended', () => {
          const audioMeanSrc = wordParams.audioMeaning;
          const audioExampleSrc = wordParams.audioExample;
          setTimeout(() => {
            const wordAudioMeaning = new Audio();
            wordAudioMeaning.src = `${this.base}/${audioMeanSrc}`;
            wordAudioMeaning.play();
            wordAudioMeaning.addEventListener('ended', () => {
              setTimeout(() => {
                const wordAudioExample = new Audio();
                wordAudioExample.src = `${this.base}/${audioExampleSrc}`;
                wordAudioExample.play();
                wordAudioExample.addEventListener('ended', () => {
                  volumeBtn!.style.display = 'block';
                });
              }, 1000);
            });
          }, 1000);
        });
      }
    }
  }

  renderSprintGame(target: HTMLElement) {
    if (!target.classList.contains('sprintGameCard')) return;
    this.sprint.render();
  }

  renderAudioGame(target: HTMLElement) {
    if (!target.classList.contains('audioChallengeGameCard')) return;
    this.audio.render();
  }

  async getWords(group: number, page: number) {
    const pathVars = { [PATH.WORDS]: null };
    const queryParams = { group, page };
    const params = { pathVars, queryParams };
    const response = await super.getResponse(params);
    const words = await response.json();
    return words;
  }

  async getWordById(wordId: string) {
    const pathVars = { [PATH.WORDS]: wordId };
    const params = { pathVars };
    const response = await super.getResponse(params);
    const word = await response.json();
    return word;
  }

  async listen(target: HTMLElement) {
    this.turnAudioOn(target);
    this.renderSprintGame(target);
    this.renderAudioGame(target);

    if (target.classList.contains('wordElement')) {
      await this.setWordInfo(target.id);
    } else if (target.classList.contains('complexity')) {
      classToggler(target, 'controls-level');
      const newGroup = Number(target.id[0]) - 1;
      await this.setWordCard(0, newGroup);
      this.updatePageAndGroup(0, newGroup);
      localStorage.setItem('group', `${newGroup}`);
    } else if (target.classList.contains('next-page') && !target.classList.contains('disabled-btn')) {
      this.nextPage();
    } else if (target.classList.contains('prev-page') && !target.classList.contains('disabled-btn')) {
      this.prevPage();
    } else if (target.id === 'dictionary') {
      this.render();
    } else if (target.classList.contains('card-click-dictionary')) {
      this.render();
    }
  }

  async nextPage() {
    const choosenComplexityBlock = document.querySelector('.choosen-complexity');
    const choosenComplexity = Number(choosenComplexityBlock!.id[0]) - 1;
    const currentPageBlock = document.querySelector('.current-page');
    const nextPage = Number(currentPageBlock!.id) + 1;
    await this.setWordCard(nextPage, choosenComplexity);
    currentPageBlock!.id = `${nextPage}`;
    currentPageBlock!.innerHTML = `${nextPage + 1}/30`;
    localStorage.setItem('page', `${nextPage}`);
    // ниже выключение кнопки "вперед"
    if (currentPageBlock!.id === '29') {
      const nextBtn: HTMLButtonElement | null = document.querySelector('.next-page');
      nextBtn!.disabled = true;
      nextBtn?.classList.add('disabled-btn');
    } else if (+currentPageBlock!.id > 0) {
      const prevBtn: HTMLButtonElement | null = document.querySelector('.prev-page');
      prevBtn!.disabled = false;
      prevBtn?.classList.remove('disabled-btn');
    }
  }

  async prevPage() {
    const choosenComplexityBlock = document.querySelector('.choosen-complexity');
    const choosenComplexity = Number(choosenComplexityBlock!.id[0]) - 1;
    const currentPageBlock = document.querySelector('.current-page');
    const prevPage = Number(currentPageBlock?.id) - 1;
    await this.setWordCard(prevPage, choosenComplexity);
    currentPageBlock!.id = `${prevPage}`;
    currentPageBlock!.innerHTML = `${prevPage + 1}/30`;
    localStorage.setItem('page', `${prevPage}`);
    // ниже выключение кнопки "назад"
    if (currentPageBlock!.id === '0') {
      const prevBtn: HTMLButtonElement | null = document.querySelector('.prev-page');
      // prevBtn!.disabled = true;
      prevBtn?.classList.add('disabled-btn');
    } else if (+currentPageBlock!.id < 29) {
      const nextBtn: HTMLButtonElement | null = document.querySelector('.next-page');
      // nextBtn!.disabled = false;
      nextBtn?.classList.remove('disabled-btn');
    }
  }

  updatePageAndGroup(page: number, group: number) {
    // ниже идет обращение к прошлой подсвеченной группе и удаление подсветки этой группы
    // здесь(ниже) уже идет обращение к новой, кликнутой группе и добавление к этой группе класс который его подсветит
    const choosenComplexityId = `${group + 1} ${group + 1}-${group}`;
    const newChoosenComplexity = document.getElementById(choosenComplexityId);
    newChoosenComplexity?.classList.add('controls-level_selected');
    // далее обновление страницы
    const currentPageBlock = document.querySelector('.current-page');
    currentPageBlock!.id = `${page}`;
    currentPageBlock!.innerHTML = `${page + 1}/30`;
    // ниже выключение кнопок пагинации если страница первая/последняя
    if (currentPageBlock!.id === '0') {
      const prevBtn: HTMLButtonElement | null = document.querySelector('.prev-page');
      prevBtn!.disabled = true;
      prevBtn?.classList.add('disabled-btn');
    } else if (currentPageBlock!.id === '29') {
      const nextBtn: HTMLButtonElement | null = document.querySelector('.next-page');
      nextBtn!.disabled = true;
      nextBtn?.classList.add('disabled-btn');
    }
  }
}

export default DictionaryPage;
