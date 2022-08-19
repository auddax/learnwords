/* eslint-disable class-methods-use-this */
import { View } from '../../types/enums';
import { IPageHeader } from '../../types/interfaces';
import './pageHeader.scss';

class PageHeader implements IPageHeader {
  view: View;

  constructor(view: View) {
    this.view = view;
  }

  render() {
    return (`
      <header class="page-header">
        <ul class="menu">
          <li class="menu-item" id="main">Main</li>
          <li class="menu-item" id="dictionary">Dictionary</li>
          <li class="menu-item" id="games">Games</li>
          <li class="menu-item" id="statistics">Statistics</li>
          <li class="menu-item" id="signin">Sign in</li>
        <ul>
      </header>
    `);
  }
}

export default PageHeader;
