/* eslint-disable no-console */
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
      this.changeView(target);
    });
  }

  async changeView(target: HTMLElement): Promise<void> {
    if (!target.classList.contains('menu-item')) return;
    const targetId = target.id as View;
    this.pageContent.view = targetId;
    await this.render();
  }

  async render() {
    this.root.innerHTML = `
      ${await this.pageHeader.render()}
      ${await this.pageContent.render()}
    `;
  }
}

export default App;
