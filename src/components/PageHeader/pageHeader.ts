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
          <li class="menu-item">Main</li>
          <li class="menu-item">Dictionary</li>
          <li class="menu-item">Games</li>
          <li class="menu-item">Statistics</li>
          <li class="menu-item">Sign in</li>
        <ul>
      </header>
    `);
  }
}

export default PageHeader;
