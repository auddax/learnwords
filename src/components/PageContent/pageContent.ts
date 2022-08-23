import { View } from '../../types/enums';
import { IGames, IPageContent, MainPage } from '../../types/interfaces';
import Games from '../Games/games';
import Main from '../Main/mainPage';

class PageContent implements IPageContent {
  view: View;

  main: MainPage;

  games: IGames;

  constructor(view: View) {
    this.view = view;
    this.main = new Main();
    this.games = new Games();
  }

  listen(target: HTMLElement) {
    this.changeView(target);
    this.games.listen(target);
  }

  listenKey(eventCode: string) {
    this.games.listenKey(eventCode);
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
        this.games.render();
        break;
      default:
    }
  }
}

export default PageContent;
