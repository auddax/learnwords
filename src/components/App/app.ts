import {
  IApp,
  IPageContent,
  IPageHeader,
  IPageFooter,
} from '../../types/interfaces';
import { VIEW } from '../../types/enums';
import PageContent from '../PageContent/pageContent';
import PageHeader from '../PageHeader/pageHeader';
import PageFooter from '../PageFooter/pageFooter';

class App implements IApp {
  root: HTMLElement;

  pageHeader: IPageHeader;

  pageContent: IPageContent;

  pageFooter: IPageFooter;

  constructor() {
    this.root = document.getElementById('root') as HTMLElement;
    this.pageHeader = new PageHeader();
    this.pageContent = new PageContent(localStorage.getItem('rsview')
      ? localStorage.getItem('rsview') as VIEW
      : VIEW.MAIN);
    this.pageFooter = new PageFooter();
  }

  listen(): void {
    this.root.addEventListener('click', (event) => {
      event.preventDefault();
      const target = event.target as HTMLElement;
      this.pageContent.listen(target);
      this.pageHeader.listen(target);
    });
    this.root.addEventListener('keydown', (event) => {
      const eventCode = (<KeyboardEvent>event).code;
      this.pageContent.listenKey(eventCode);
    });
    document.addEventListener('storage', (event) => {
      const { key } = <StorageEvent>event;
      this.pageContent.listenStorage(key);
    });
    window.addEventListener('popstate', () => {
      const { path } = window.history.state;
      this.pageContent.router(path, true);
    });
  }

  async render() {
    this.root.innerHTML = `
      <header class="page-header">
      </header>
      <main class="page-content">
      </main>
      <footer class="page-footer">
      </footer>
    `;
    this.pageHeader.render();
    this.pageContent.render();
    this.pageFooter.render();
    this.pageContent.router(VIEW.MAIN);
  }
}

export default App;
