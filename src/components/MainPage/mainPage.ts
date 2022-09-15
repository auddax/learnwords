/* eslint-disable class-methods-use-this */
import { IMainPage } from '../../types/interfaces';

class Main implements IMainPage {
  render() {
    localStorage.setItem('rsview', 'main');
    const main = document.querySelector('.page-content');
    if (main) {
      main.innerHTML = `
        <section class="main-page container">
          <section class="main-page__info">
            <div class="info__content">
              <h1 class="content__header">RS Lang</h1>
              <p class="content__description">Начни изучать английский язык с нами прямо сейчас!</p>
              <button class="content__button">Начать</button>
            </div>
            <div class="info__img">
              <figure>
                <img class="welcome-img" src="./img/welcome-img.svg" alt="RSLang">
              </figure>
            </div>
          </section>
          <section class="main-page__features">
            <header class="features__header">
              <h2>Учи английский вместе с нами!</h2>
            </header>
            <section class="features__cardbox">
              <article class="main-page__card">
                <figure class="card__img" >
                  <img src="./img/dictionary-card.svg" alt="Dictionary">
                </figure>
                <h3 class="card__title">Учебник</h3>
                <p class="card__text">Отличное пособие для изучения новых слов. Создай свой собственный словарь для закрепления трудных слов.</p>
              </article>
              <article class="main-page__card">
                <figure class="card__img" >
                  <img src="./img/sprint-game-logo.svg" alt="Brain">
                </figure>
                <h3 class="card__title">Игры</h3>
                <p class="card__text">Изучение английского больше не скучно. Играй и запоминай слова и их произношение!</p>
              </article>
              <article class="main-page__card">
                <figure class="card__img" >
                  <img src="./img/statistic-card.svg" alt="Tablet">
                </figure>
                <h3 class="card__title">Статистика</h3>
                <p class="card__text">Весь прогресс твоего изучения ты можешь увидеть в одном разделе.</p>
              </article>
            </section>
          </section>
        </section>
      `;
    }
  }
}
export default Main;
