/* eslint-disable class-methods-use-this */
import { View } from '../../types/enums';
import { IPageHeader } from '../../types/interfaces';
import './pageHeader.scss';

class PageHeader implements IPageHeader {
  render() {
    const header = document.querySelector('.page-header');
    if (header) {
      header.innerHTML = `
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <a class="logo-link" href="#">
              <h1 class="logo-text">RS Lang</h1>
            </a>
          </div>
          <ul class="menu">
            <li class="menu-item" id="${View.MAIN}">Home</li>
            <li class="menu-item" id="${View.DICTIONARY}">Dictionary</li>
            <li class="menu-item" id="${View.GAMES}">Games</li>
            <li class="menu-item" id="${View.STATISTICS}">Statistics</li>
            <li class="menu-item" id="${View.SIGNIN}">
            <button class="btn login-btn">Log in</button>
            </li>
          </ul>
        </div>
      </div>
      `;
    }
  }
}

export default PageHeader;
