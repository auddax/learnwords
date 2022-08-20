import { View } from '../../types/enums';
import { IPageContent, ISprint, MainPage } from '../../types/interfaces';
import Main from '../Main/mainPage';
import Sprint from '../Sprint/sprint';

class PageContent implements IPageContent {
  view: View;

  main: MainPage;

  sprint: ISprint;

  constructor(view: View) {
    this.view = view;
    this.main = new Main();
    this.sprint = new Sprint();
  }

  listen(target: HTMLElement) {
    this.changeView(target);
    this.sprint.listen(target);
  }

  changeView(target: HTMLElement) {
    if (!target.classList.contains('menu-item')) return;
    this.view = target.id as View;
    this.render();
  }

  async render() {
    switch (this.view) {
      case 'main':
        this.main.render();
        break;
      case 'games':
        this.sprint.render();
        break;
      default:
    }
  }
}

export default PageContent;
