import { View } from '../../types/enums';
import { IPageContent } from '../../types/interfaces';

class PageContent implements IPageContent {
  view: View;

  constructor(view: View) {
    this.view = view;
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
    if (main) main.innerHTML = `<h1>${this.view} page is under construction 🛠️</h1>`;
  }
}

export default PageContent;
