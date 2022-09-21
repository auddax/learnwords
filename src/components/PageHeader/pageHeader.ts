/* eslint-disable class-methods-use-this */
import { VIEW } from '../../types/enums';
import { IPageHeader } from '../../types/interfaces';
import './pageHeader.scss';

class PageHeader implements IPageHeader {
  userName: string | null;

  constructor() {
    this.userName = localStorage.getItem('userName');
  }

  listen(target: HTMLElement): void {
    this.menuToggler(target);
  }

  menuToggler(target: HTMLElement): void {
    if (target.id !== 'menuToggler') return;
    const headerOverlay = document.querySelector('.header__overlay') as HTMLElement;
    const headerMenu = document.querySelector('.header__menu') as HTMLElement;
    if (!target.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
      target.classList.add('active');
      headerOverlay.classList.add('active');
      headerMenu.classList.add('active');
    } else {
      document.body.style.overflow = 'auto';
      target.classList.remove('active');
      headerOverlay.classList.remove('active');
      headerMenu.classList.remove('active');
    }
  }

  render() {
    const header = document.querySelector('.page-header');
    const menuSignIn = `
      <button class="menu__button-signin link" data-href="${VIEW.SIGNIN}">Войти</button>
    `;
    const menuSignOut = `
      <span class="menu__username">${this.userName}</span>
      <button class="menu__button-signout link" data-href="${VIEW.SIGNOUT}">Выйти</button>
    `;

    if (header) {
      header.innerHTML = `
      <div class="header container">
        <div class="header__logo">
          <img src="./img/learnwords-logo-dark-blue.svg" class="link" data-href="${VIEW.MAIN}">
        </div>
        <div class="header__toggler" id="menuToggler">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="header__overlay">
          <ul class="header__menu">
            <li class="menu-item link" data-href="${VIEW.MAIN}">Главная</li>
            <li class="menu-item link" data-href="${VIEW.DICTIONARY}">Учебник</li>
            <li class="menu-item link" data-href="${VIEW.GAMES}">Игры</li>
            <li class="menu-item link" data-href="${VIEW.STATISTICS}">Статистика</li>
            <li class="menu-item">${this.userName ? menuSignOut : menuSignIn}</li>
          </ul>
        </div>
      </div>
      `;
    }
  }
}

export default PageHeader;
