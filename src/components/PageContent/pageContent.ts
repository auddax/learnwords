import { View } from '../../types/enums';
import {
  IGames,
  IPageContent,
  IStatistics,
  MainPage,
  IAuth,
} from '../../types/interfaces';
import Games from '../Games/games';
import Main from '../Main/mainPage';
import Statistics from '../Statistics/statistics';
import Auth from '../Auth/auth';

class PageContent implements IPageContent {
  view: View;

  main: MainPage;

  games: IGames;

  statistics: IStatistics;

  auth: IAuth;

  constructor(view: View) {
    this.view = view;
    this.main = new Main();
    this.games = new Games();
    this.statistics = new Statistics();
    this.auth = new Auth();
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
      case 'statistics':
        this.statistics.render();
        break;
      case 'signin':
        this.auth.render();
        break;
      default:
    }
  }
}

export default PageContent;
