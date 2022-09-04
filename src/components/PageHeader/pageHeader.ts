/* eslint-disable class-methods-use-this */
import { View } from '../../types/enums';
import { IPageHeader } from '../../types/interfaces';
import './pageHeader.scss';

class PageHeader implements IPageHeader {
  userName: string | null;

  constructor() {
    this.userName = localStorage.getItem('userName');
  }

  render() {
    const header = document.querySelector('.page-header');
    const menuSignIn = `
      <button class="menu__button-signin" id="${View.SIGNIN}">Sign in</button>
    `;
    const menuSignOut = `
      <span class="menu__username">${this.userName}</span>
      <button class="menu__button-signout" id="signout">Sign out</button>
    `;

    if (header) {
      header.innerHTML = `
      <div class="header container">
        <div class="header__logo">
          <h1 class="logo-text" id="${View.MAIN}">RS Lang</h1>
        </div>
        <ul class="header__menu">
          <li class="menu-item" id="${View.MAIN}">Home</li>
          <li class="menu-item" id="${View.DICTIONARY}">Dictionary</li>
          <li class="menu-item" id="${View.GAMES}">Games</li>
          <li class="menu-item" id="${View.STATISTICS}">Statistics</li>
          <li class="menu-item">${this.userName ? menuSignOut : menuSignIn}</li>
        </ul>
      </div>
      `;
    }
  }
}

export default PageHeader;
