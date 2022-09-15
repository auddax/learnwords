import { View } from '../../types/enums';
import {
  IGames,
  IPageContent,
  IStatistics,
  MainPage,
  IAuth,
  IDictionaryPage,
} from '../../types/interfaces';
import Games from '../Games/games';
import Main from '../MainPage/mainPage';
import Statistics from '../Statistics/statistics';
import Auth from '../Auth/auth';
import DictionaryPage from '../DictionaryPage/dictionaryPage';

class PageContent implements IPageContent {
  view: View | string | null;

  main: MainPage;

  dictionary: IDictionaryPage;

  games: IGames;

  statistics: IStatistics;

  auth: IAuth;

  constructor(view: View) {
    this.view = view;
    this.main = new Main();
    this.dictionary = new DictionaryPage();
    this.games = new Games();
    this.statistics = new Statistics();
    this.auth = new Auth();
  }

  listen(target: HTMLElement) {
    this.changeView(target);
    this.games.listen(target);
    this.dictionary.listen(target);
    this.auth.listen(target);
  }

  listenKey(eventCode: string) {
    this.games.listenKey(eventCode);
  }

  listenStorage(key: string | null) {
    this.dictionary.listenStorage(key);
  }

  changeView(target: HTMLElement) {
    if (!(target.classList.contains('menu-item')
        || target.classList.contains('logo-text')
        || target.classList.contains('menu__button-signin'))
    ) return;
    this.view = target.id as View;
    this.render();
  }

  async render() {
    switch (this.view) {
      case 'main':
        this.main.render();
        break;
      case 'dictionary':
        this.dictionary.render();
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
