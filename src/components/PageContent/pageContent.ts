import { View } from '../../types/enums';
import { IPageContent, MainPage } from '../../types/interfaces';
import Main from '../Main/mainPage';

class PageContent implements IPageContent {
  view: View;

  main: MainPage;

  constructor(view: View) {
    this.view = view;
    this.main = new Main();
  }

  listen(target: HTMLElement) {
    this.changeView(target);
  }

  changeView(target: HTMLElement) {
    if (!target.classList.contains('menu-item')) return;
    this.view = target.id as View;
    this.render();
  }

  async render() {
    const main = document.querySelector('.page-content');
    if (main) main.innerHTML = this.main.render();
  }
}

export default PageContent;
