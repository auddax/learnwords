/* eslint-disable object-shorthand */
/* eslint-disable  @typescript-eslint/lines-between-class-members */
/* eslint-disable max-lines-per-function */
/* eslint-disable prefer-const */
/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Loader from '../Loader/loader';
import { PATH } from '../../types/enums';
import environment from '../../environment/environment';
import { IDictionaryPage } from '../../types/interfaces';

class DictionaryPage extends Loader implements IDictionaryPage {
  base: string;

  constructor() {
    super();
    this.base = environment.baseUrl;
  }
  async render() {
    const mainBlock = document.querySelector('.page-content');
    if (mainBlock) {
      mainBlock!.innerHTML = `
      <section class="dictionary">
      <div class="container">
        <div class="dictionary-title">
          <h1>Словарь</h1>
          <h3 class="complexity-title">Выберите сложность</h3>
          <div class="dictionary-complexity">
            <div id="1 1-0" class="complexity-a1 complexity-level complexity choosen-complexity-1 choosen-complexity">
              <h3 id="1" class="complexity-text complexity">A1</h3>
              <p id="1" class="complexity-wrod-count complexity">1-600</p>
            </div>
            <div id="2 2-1" class="complexity-a2 complexity complexity-level">
              <h3 id="2" class="complexity-text complexity">A2</h3>
              <p id="2" class="complexity-wrod-count complexity">600-1200</p>
            </div>
            <div id="3 3-2" class="complexity-b1 complexity complexity-level">
              <h3 id="3" class="complexity-text complexity">B1</h3>
              <p id="3" class="complexity-wrod-count complexity ">1200-1800</p>
            </div>
            <div id="4 4-3" class="complexity-b2 complexity complexity-level">
              <h3 id="4" class="complexity-text complexity ">B2</h3>
              <p id="4" class="complexity-wrod-count complexity">1800-2400</p>
            </div>
            <div id="5 5-4" class="complexity-c1 complexity complexity-level">
              <h3 id="5" class="complexity-text complexity ">C1</h3>
              <p id="5" class="complexity-wrod-count complexity">2400-3000</p>
            </div>
            <div id="6 6-5" class="complexity-c2 complexity complexity-level">
              <h3 id="6" class="complexity-text complexity">C2</h3>
              <p id="6" class="complexity-wrod-count complexity">3000-3600</p>
            </div>
          </div>
          <div class="dictionary-words">
            <div class="words">
            </div>
          <div class="word-info">
          </div>
        </div>
        <div class="dictionary-pagination">
          <div class="pagination-prev">
            <button class="prev-page">Prev</buuton>
          </div>
          <div class="pagination-current">
            <p id="0" class="current-page">1/30</p>
          </div>
          <div class="pagination-next">
            <button class="next-page">Next</button>
          </div>
        </div>
      </div>
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
    const wordInfoBlock = document.querySelector('.word-info');
    wordInfoBlock!.innerHTML = `
            <div class="word-img">
              <img src="${this.base}/${wordParams.image}" alt="">
            </div>
            <div class="word-info-content">
              <div class="word-english">
                <p>${wordParams.word}</p>
                <div class="volume-img">
                  <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                  width="1280.000000pt" height="1079.000000pt" viewBox="0 0 1280.000000 1079.000000"
                  preserveAspectRatio="xMidYMid meet">
                  <metadata>
                  Created by potrace 1.15, written by Peter Selinger 2001-2017
                  </metadata>
                  <g transform="translate(0.000000,1079.000000) scale(0.100000,-0.100000)"
                  fill="#000000" stroke="none">
                  <path d="M7100 10730 c-36 -31 -528 -453 -1095 -936 -566 -483 -1351 -1152
                  -1742 -1486 l-713 -608 -1533 0 c-996 0 -1553 -4 -1588 -10 -193 -37 -379
                  -216 -419 -406 -7 -33 -10 -644 -8 -1899 3 -1773 4 -1852 22 -1899 46 -125
                  150 -243 265 -305 122 -65 23 -61 1698 -61 l1523 0 1253 -1067 c688 -587 1512
                  -1289 1829 -1560 318 -270 580 -488 583 -483 12 19 34 178 44 315 79 1045 89
                  5271 21 8665 -19 944 -49 1730 -68 1779 -6 16 -15 12 -72 -39z"/>
                  <path d="M10847 10100 c-98 -109 -177 -200 -177 -202 0 -2 55 -60 123 -129
                  270 -273 505 -616 726 -1059 652 -1311 890 -2979 640 -4485 -158 -954 -481
                  -1811 -992 -2631 -101 -163 -301 -452 -374 -540 l-33 -41 217 -163 217 -163
                  22 26 c42 49 242 332 336 477 229 351 419 700 583 1069 587 1325 789 2790 589
                  4281 -188 1410 -728 2714 -1455 3517 -61 68 -141 149 -178 182 l-68 60 -176
                  -199z"/>
                  <path d="M9730 8794 c-91 -102 -169 -191 -174 -197 -5 -9 18 -38 74 -92 720
                  -698 1123 -2299 965 -3835 -106 -1032 -455 -1890 -969 -2389 -42 -41 -75 -77
                  -74 -82 4 -11 349 -389 355 -389 14 0 118 99 205 195 679 749 1058 1944 1058
                  3335 0 1358 -368 2615 -984 3360 -85 103 -262 280 -279 279 -7 0 -86 -84 -177
                  -185z"/>
                  <path d="M8189 7733 l-196 -176 91 -107 c616 -722 838 -1675 627 -2691 -106
                  -507 -320 -1004 -627 -1456 l-83 -122 197 -139 c108 -76 208 -146 221 -155 29
                  -19 22 -26 138 148 374 562 624 1192 722 1815 39 251 46 343 46 635 0 295 -8
                  399 -46 633 -97 590 -347 1149 -716 1605 -83 103 -161 187 -171 187 -4 -1 -95
                  -80 -203 -177z"/>
                  </g>
                  </svg>
                  <div id="${wordId}" class="volume-button"></div>
                </div>
            </div>
            <div class="word-translate">
              <p>${wordParams.wordTranslate}</p>
            </div>
            <div class="word-transcript">
              <p>${wordParams.transcription}</p>
            </div>
            <div class="word-mean">
              <h3 class="word-mean-title">Значение</h3>
              <p class="word-mean-english">${wordParams.textMeaning}</p>
              <p class="word-mean-translate">
              ${wordParams.textMeaningTranslate}
              </p>
            </div>
            <div class="word-examples">
              <h3 class="word-example-title">
                Примеры
              </h3>
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
  async getWords(group: number, page: number) {
    const pathVars = { [PATH.WORDS]: null };
    const queryParams = { group: group, page };
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
    if (target.classList.contains('wordElement')) {
      await this.setWordInfo(target.id);
    } else if (target.classList.contains('complexity')) {
      const newGroup = Number(target.id[0]) - 1;
      await this.setWordCard(0, newGroup);
      this.updatePageAndGroup(0, newGroup);
      localStorage.setItem('group', `${newGroup}`);
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
    } else if (target.classList.contains('next-page')) {
      this.nextPage();
    } else if (target.classList.contains('prev-page')) {
      this.prevPage();
    } else if (target.id === 'dictionary') {
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
      prevBtn!.disabled = true;
      prevBtn?.classList.add('disabled-btn');
    } else if (+currentPageBlock!.id < 29) {
      const nextBtn: HTMLButtonElement | null = document.querySelector('.next-page');
      nextBtn!.disabled = false;
      nextBtn?.classList.remove('disabled-btn');
    }
  }
  updatePageAndGroup(page: number, group: number) {
    // ниже идет обращение к прошлой подсвеченной группе и удаление подсветки этой группы
    const choosenComplexity = document.querySelector('.choosen-complexity');
    choosenComplexity?.classList.remove(`choosen-complexity-${choosenComplexity.id[0]}`);
    choosenComplexity?.classList.remove('choosen-complexity');
    // здесь(ниже) уже идет обращение к новой, кликнутой группе и добавление к этой группе класс который его подсветит
    const choosenComplexityId = `${group + 1} ${group + 1}-${group}`;
    const newChoosenComplexity = document.getElementById(choosenComplexityId);
    newChoosenComplexity?.classList.add('choosen-complexity');
    newChoosenComplexity?.classList.add(`choosen-complexity-${group + 1}`);
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
