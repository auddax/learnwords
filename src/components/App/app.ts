import { IApp, IPageContent, IPageHeader } from '../../types/interfaces';
import { View } from '../../types/enums';
import PageContent from '../PageContent/pageContent';
import PageHeader from '../PageHeader/pageHeader';

class App implements IApp {
  root: HTMLElement;

  pageHeader: IPageHeader;

  pageContent: IPageContent;

  constructor() {
    this.root = document.getElementById('root') as HTMLElement;
    this.pageHeader = new PageHeader();
    this.pageContent = new PageContent(View.MAIN);
  }

  listen(): void {
    this.root.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      this.pageContent.listen(target);
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
  }
}

export default App;
