import { VIEW } from '../../types/enums';
import {
  IGames,
  IPageContent,
  IStatistics,
  IMainPage,
  IAuth,
  IDictionaryPage,
} from '../../types/interfaces';
import Games from '../Games/games';
import Main from '../MainPage/mainPage';
import Statistics from '../Statistics/statistics';
import Auth from '../Auth/auth';
import DictionaryPage from '../DictionaryPage/dictionaryPage';

class PageContent implements IPageContent {
  view: VIEW | string | null;

  main: IMainPage;

  dictionary: IDictionaryPage;

  games: IGames;

  statistics: IStatistics;

  auth: IAuth;

  constructor(view: VIEW) {
    this.view = view;
    this.main = new Main();
    this.dictionary = new DictionaryPage();
    this.games = new Games();
    this.statistics = new Statistics();
    this.auth = new Auth();
  }

  listen(target: HTMLElement): void {
    this.linkHandler(target);
    this.games.listen(target);
    this.dictionary.listen(target);
    this.auth.listen(target);
  }

  listenKey(eventCode: string): void {
    this.games.listenKey(eventCode);
  }

  listenStorage(key: string | null): void {
    this.dictionary.listenStorage(key);
  }

  linkHandler(target: HTMLElement): void {
    if (!target.classList.contains('link')) return;
    const path = target.dataset.href;
    this.router(path);
  }

  router(path: string | undefined): void {
    window.history.pushState({}, '', path);
    if (path) {
      document.title = `RS Lang | ${path[0].toUpperCase() + path.slice(1)}`;
    }
    this.view = path as VIEW;
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
