/* eslint-disable no-console */
import {
  IApp, IPageContent, IPageHeader, IPageFooter, IDictionaryPage,
} from '../../types/interfaces';
import { View } from '../../types/enums';
import PageContent from '../PageContent/pageContent';
import PageHeader from '../PageHeader/pageHeader';
import PageFooter from '../PageFooter/pageFooter';
import DictionaryPage from '../DictionaryPage/dictionaryPage';

class App implements IApp {
  root: HTMLElement;

  pageHeader: IPageHeader;

  pageContent: IPageContent;

  pageFooter: IPageFooter;

  dictionaryPage: IDictionaryPage;

  constructor() {
    this.root = document.getElementById('root') as HTMLElement;
    this.pageHeader = new PageHeader();
    this.pageContent = new PageContent(View.MAIN);
    this.pageFooter = new PageFooter();
    this.dictionaryPage = new DictionaryPage();
  }

  listen(): void {
    this.root.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      this.pageContent.listen(target);
      this.dictionaryPage.listen(target);
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
    // this.dictionaryPage.render();
    // const dictionaryBtn = document.getElementById(View.DICTIONARY);
    // dictionaryBtn?.addEventListener('click', () => {
    //   this.dictionaryPage.render();
    // });
  }
}

export default App;
