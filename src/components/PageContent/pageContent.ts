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
    this.games = new Games();
    this.statistics = new Statistics();
    this.dictionary = new DictionaryPage(
      this.games.sprint,
      this.games.audio,
    );
    this.auth = new Auth();
  }

  listen(target: HTMLElement): void {
    this.linkHandler(target);
    this.dictionary.listen(target);
    this.games.listen(target);
    this.statistics.listen(target);
    this.auth.listen(target);
  }

  listenKey(eventCode: string): void {
    this.games.listenKey(eventCode);
  }

  listenStorage(key: string | null): void {
    this.dictionary.listenStorage(key);
    this.statistics.listenStorage(key);
  }

  linkHandler(target: HTMLElement): void {
    if (!target.classList.contains('link')) return;
    const path = target.dataset.href;
    this.router(path);
    const toggler = document.getElementById('menuToggler');
    if (toggler && toggler.classList.contains('active')) {
      const headerOverlay = document.querySelector('.header__overlay') as HTMLElement;
      const headerMenu = document.querySelector('.header__menu') as HTMLElement;
      document.body.style.overflow = 'auto';
      toggler.classList.remove('active');
      headerOverlay.classList.remove('active');
      headerMenu.classList.remove('active');
    }
  }

  router(path: string | undefined, popstate = false): void {
    if (!popstate) window.history.pushState({ path }, '', path);
    if (path) {
      document.title = `LearnWords | ${path[0].toUpperCase() + path.slice(1)}`;
    }
    this.view = path as VIEW;
    this.render();
  }

  async render() {
    switch (this.view) {
      case VIEW.MAIN:
        this.main.render();
        break;
      case VIEW.DICTIONARY:
        this.dictionary.render();
        break;
      case VIEW.GAMES:
        this.games.render();
        break;
      case VIEW.STATISTICS:
        this.statistics.render();
        break;
      case VIEW.SIGNIN:
        this.auth.render();
        break;
      default:
    }
  }
}

export default PageContent;
