/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable object-shorthand */
/* eslint-disable  @typescript-eslint/lines-between-class-members */
/* eslint-disable prefer-const */
/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { DICTIONARY, PATH } from '../../types/enums';
import {
  IAudioChallenge,
  IDictionaryPage,
  ISprint,
  IWords,
} from '../../types/interfaces';
import environment from '../../environment/environment';
import Loader from '../Loader/loader';
import Sprint from '../Sprint/sprint';
import AudioChallenge from '../AudioChallenge/audioChallenge';
import { classToggler } from '../../utils/utils';
import './dictionaryPage.scss';

class DictionaryPage extends Loader implements IDictionaryPage {
  base: string;

  view: DICTIONARY;

  audio: IAudioChallenge;

  sprint: ISprint;

  userName: string | null;

  selectedWordId: string;

  constructor() {
    super();
    this.base = environment.baseUrl;
    this.view = DICTIONARY.WORDS;
    this.audio = new AudioChallenge();
    this.sprint = new Sprint();
    this.userName = localStorage.getItem('userName');
    this.selectedWordId = '';
  }

  listenStorage(key: string | null) {
    if (key === 'userName') {
      this.userName = localStorage.getItem('userName');
      this.render();
    }
  }

  render() {
    const mainBlock = document.querySelector('.page-content');
    const complexityHeaderUnauth = `
      <h2 class="complexity-title">Select Level</h2>
    `;
    const complexityHeaderAuth = `
      <h2 class="complexity-title">Select Level</h2>
      <button type="button" class="complexity-hard controls-level" id="wordHardShow">Hard</button>
    `;

    if (mainBlock) {
      mainBlock.innerHTML = `
      <section class="dictionary container">
        <header class="dictionary-header">
          <h1 class="dictionary-title">Dictionary</h1>
          <div class="dictionary-controls">
            <div class="controls-complexity">
              <div class="complexity-header">
                ${this.userName ? complexityHeaderAuth : complexityHeaderUnauth}
              </div>
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
        this.updatePageAndGroup(0, 0);
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
    const currentPageBlock = document.querySelector('.current-page') as HTMLElement;
    const currentPageBlockId = currentPageBlock ? currentPageBlock.id : Number(localStorage.page);
    if (currentPageBlockId === '0') {
      const prevBtn: HTMLButtonElement | null = document.querySelector('.prev-page');
      prevBtn!.disabled = true;
      prevBtn?.classList.add('disabled-btn');
    } else if (currentPageBlockId === '29') {
      const nextBtn: HTMLButtonElement | null = document.querySelector('.next-page');
      nextBtn!.disabled = true;
      nextBtn?.classList.add('disabled-btn');
    }
  }

  async setWordInfo(wordId: string) {
    this.selectedWordId = wordId;
    const wordParams = await this.getWordById(wordId);
    const wordInfoBlock = document.querySelector('.words-info') as HTMLElement;
    const wordHardAdd = '<button type="button" class="word-hard" id="wordHardAdd">Hard</button>';
    const wordHardRemove = '<button type="button" class="word-hard" id="wordHardRemove">Remove</button>';
    const wordHardButtonsBlock = `
      ${this.view === DICTIONARY.WORDS ? wordHardAdd : wordHardRemove}
      <button type="button" class="word-hard" id="wordHardLearned">Learned</button>
    `;

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
            <audio id="audioWordSound">
              <source src="${environment.baseUrl}/${wordParams.audio}" type="audio/mpeg">
            </audio>
            <div id="${wordId}" class="volume-button"></div>
          </div>
          ${this.userName ? wordHardButtonsBlock : ''}
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

  async wordHardAdd(target: HTMLElement) {
    if (target.id !== 'wordHardAdd') return;
    const userId = localStorage.getItem('userId');
    const userToken = localStorage.getItem('userToken');

    const pathVars = {
      [PATH.USERS]: userId,
      [PATH.WORDS]: this.selectedWordId,
    };

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Authorization', `Bearer ${userToken}`);

    const raw = JSON.stringify({
      difficulty: 'hard',
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    const params = { pathVars };
    await super.getResponse(params, requestOptions);
  }

  async wordHardRemove(target: HTMLElement) {
    if (target.id !== 'wordHardRemove') return;
    const userId = localStorage.getItem('userId');
    const userToken = localStorage.getItem('userToken');

    const pathVars = {
      [PATH.USERS]: userId,
      [PATH.WORDS]: this.selectedWordId,
    };

    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${userToken}`);

    const requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
    };

    const params = { pathVars };
    await super.getResponse(params, requestOptions);

    const wordCard = document.getElementById(this.selectedWordId);
    const wordInfo = document.querySelector('.words-info') as HTMLElement;
    if (wordCard) wordCard.remove();
    if (wordInfo) wordInfo.innerHTML = '';
  }

  async wordHardShow(target: HTMLElement) {
    if (target.id !== 'wordHardShow') return;
    const wordsBlock = document.querySelector('.words') as HTMLElement;
    if (wordsBlock) wordsBlock.innerHTML = '';
    const userId = localStorage.getItem('userId');
    const userToken = localStorage.getItem('userToken');

    const pathVars = {
      [PATH.USERS]: userId,
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

    words.forEach(async (item: IWords) => {
      const word = await this.getWordById(item.wordId);
      const wordCard = this.renderWordCard(word.word, word.wordTranslate, word.id);
      wordsBlock?.append(wordCard);
    });
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

  changeButtonSelection(target: HTMLElement) {
    if (target.classList.contains('controls-level')) {
      classToggler(target, 'controls-level');
    }
  }

  async changeView(target: HTMLElement) {
    if (target.id === 'wordHardShow') {
      const buttonHard = document.getElementById('wordHardAdd') as HTMLElement;
      this.view = DICTIONARY.HARD;
      buttonHard.innerText = 'Remove';
      buttonHard.id = 'wordHardRemove';
      const pagination = document.querySelector('.dictionary-pagination');
      if (pagination) pagination.innerHTML = '';
    } else if (target.classList.contains('complexity')) {
      // const buttonHard = document.getElementById('wordHardRemove') as HTMLElement;
      if (this.view === DICTIONARY.HARD) {
        this.view = DICTIONARY.WORDS;
        const buttonHard = document.getElementById('wordHardRemove') as HTMLElement;
        if (buttonHard) {
          buttonHard.innerText = 'Hard';
          buttonHard.id = 'wordHardAdd';
        }
        const pagination = document.querySelector('.dictionary-pagination');
        if (pagination) {
          pagination.innerHTML = `
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
          `;
        }
      }
      const newGroup = Number(target.id[0]) - 1;
      await this.setWordCard(0, newGroup);
      this.updatePageAndGroup(0, newGroup);
      localStorage.setItem('group', `${newGroup}`);
    }
  }

  async listen(target: HTMLElement) {
    this.turnAudioOn(target);
    this.renderSprintGame(target);
    this.renderAudioGame(target);
    this.wordHardAdd(target);
    this.wordHardRemove(target);
    this.wordHardShow(target);
    this.changeButtonSelection(target);
    this.changeView(target);

    if (target.classList.contains('wordElement')) {
      await this.setWordInfo(target.id);
    } else if (target.classList.contains('volume-button')) {
      document.querySelector('.audio > audio')?.remove();
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
            }, 1000);
          });
        }, 1000);
      });
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
    const choosenComplexity = document.querySelector('.choosen-complexity');
    choosenComplexity?.classList.remove('choosen-complexity');
    // здесь(ниже) уже идет обращение к новой, кликнутой группе и добавление к этой группе класс который его подсветит
    const choosenComplexityId = `${group + 1} ${group + 1}-${group}`;
    const newChoosenComplexity = document.getElementById(choosenComplexityId);
    newChoosenComplexity?.classList.add('controls-level_selected');
    newChoosenComplexity?.classList.add('choosen-complexity');
    // далее обновление страницы
    const currentPageBlock = document.querySelector('.current-page') as HTMLElement;
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
