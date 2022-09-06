/* eslint-disable class-methods-use-this */
/* eslint-disable max-lines-per-function */
/* eslint-disable  @typescript-eslint/no-non-null-assertion */
import {
  MainPage,
  IGames,
  IStatistics,
  IDictionaryPage,
} from '../../types/interfaces';
import Games from '../Games/games';
import Statistics from '../Statistics/statistics';
import DictionaryPage from '../DictionaryPage/dictionaryPage';

class Main implements MainPage {
  games: IGames;

  statistic: IStatistics;

  dictionary: IDictionaryPage;

  constructor() {
    this.games = new Games();
    this.statistic = new Statistics();
    this.dictionary = new DictionaryPage();
  }

  render() {
    const main = document.querySelector('.page-content');
    if (main) {
      main.innerHTML = `
    <section class="section-info">
    <div class="container">
      <div class="info-content">
        <div class="info-content-text">
          <h1 class="info-content-title">RS Lang</h1>
          <p class="info-content-subtitle">
            Начни изучать английский язык с нами прямо сейчас!
          <p>
          <button class="info-content-btn btn">Начать</button>
        </div>
        <div class="info-content-image">
          <img class="content-image" src="./img/info-img.svg" alt="Info-Img"></img>
        </div>
      </div>
    </div>
  </section>
  <section class="demonstration">
  <div class="container">
    <div class="demonstration-content">
      <div class="demonstration-title">
        <h2 class="title">О приложении</h2>
      </div>
      <div class="demonstration-video">
        <iframe width="800" height="400" src="https://www.youtube.com/watch?v=cFUpyQpPS2M"
        title="YouTube video player" frameborder="0">
        </iframe>
      </div>
    </div>
  </div>
  </section>
  <section class="features">
    <div class="container">
      <div class="features-content">
        <div class="features-title">
          <h2 class="title">Учи английский вместе с нами!</h2>
        </div>
        <div class="features-card">
          <div class="card card-dictionary">
            <div class="card-click card-click-dictionary"></div>
            <div class="card-content card-dictionary-content">
              <img class="card-img card-dictionary-img" src="./img/dictionary-card.svg" alt="Dictionary"></img>
              <h3 class="card-title">Учебник</h3>
              <p class="card-subtitle">Отличное пособие для изучения новых слов. Создай свой собственный словарь для закрепления трудных слов.</p>
            </div>
          </div>
          <div class="card card-games">
            <div class="card-click card-click-games"></div>
            <div class="card-content card-games-content">
              <img class="card-img card-games-img" src="./img/sprint-game-logo.svg" alt="Brain"></img>
              <h3 class="card-title">Игры</h3>
              <p class="card-subtitle">Изучение английского больше не скучно. Играй и запоминай слова и их произношение!</p>
            </div>
          </div>
          <div class="card card-statistic">
            <div class="card-click card-click-statistic"></div>
            <div class="card-content card-statistic-content">
              <img class="card-img card-statistic-img" src="./img/statistic-card.svg" alt="dictionary-image"></img>
              <h3 class="card-title">Статистика</h3>
              <p class="card-subtitle">Весь прогресс твоего изучения ты можешь видеть в одном разделе.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="team>
    <div class="container">
      <div class="team-content">
        <h2 class="team-title title">Команда разработчиков</h2>
        <div class="team-members">
          <div class="member member-kirill">
            <div class=" member-photo member-kirill-photo">
              <img src="./img/member-kirill2.jpg" alt="member-photo">
            </div>
            <div class="member-text">
              <div class="member-name">
                <h3 class="name">Кирилл</h3>
                <div class="git-logo">
                  <a target="_blank" href="https://github.com/auddax" class="member-github-link">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>
              <p class="member-history">Тимлид команды. Настроил репозиторий для совместной работы, продумал структуру приложения, организовал и распределил работу. Сделал дизайн приложения и мини-игры.</p>
            </div>
          </div>
          <div class="member member-kuanyshbek">
            <div class="member-text">
              <div class="member-name">
                <h3 class="name">Куанышбек </h3>
                <div class="git-logo">
                  <a target="_blank" href="https://github.com/zone0119" class="member-github-link">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>
              <p class="member-history">Разработал модуль авторизации и регистрации. Написал текст для приложения.</p>
            </div>
            <div class=" member-photo member-kuanyshbek-photo">
              <img src="./img/member-kuanyshbek.jpg" alt="member-photo">
            </div>
          </div>
          <div class="member member-oomat">
            <div class=" member-photo member-oomat-photo">
              <img src="./img/member-oomat2.jpg" alt="member-photo">
            </div>
            <div class="member-text">
              <div class="member-name">
                <h3 class="name">Оомат</h3>
                <div class="git-logo">
                  <a target="_blank" href="https://github.com/omkavtanke" class="member-github-link">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>
              <p class="member-history">Разработал словарь и правил верстку.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
`;
    }
    const gamesCard = document.querySelector('.card-click-games');
    const statisticCard = document.querySelector('.card-click-statistic');
    if (gamesCard) {
      gamesCard.addEventListener('click', () => {
        this.games.render();
      });
      statisticCard!.addEventListener('click', () => {
        this.statistic.render();
      });
      const startBtn: HTMLButtonElement | null = document.querySelector('.info-content-btn');
      startBtn!.addEventListener('click', () => this.dictionary.render());
    }
  }
}
export default Main;
