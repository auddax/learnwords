/* eslint-disable class-methods-use-this */
import { View } from '../../types/enums';
import { IPageHeader } from '../../types/interfaces';
import './pageHeader.scss';

class PageHeader implements IPageHeader {
  render() {
    const header = document.querySelector('.page-header');
    if (header) {
      header.innerHTML = `
        <ul class="menu">
          <li class="menu-item" id="${View.MAIN}">Main</li>
          <li class="menu-item" id="${View.DICTIONARY}">Dictionary</li>
          <li class="menu-item" id="${View.GAMES}">Games</li>
          <li class="menu-item" id="${View.STATISTICS}">Statistics</li>
          <li class="menu-item" id="${View.SIGNIN}">Sign in</li>
        <ul>
      `;
    }
  }
}

export default PageHeader;
