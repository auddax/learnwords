import { IApp, IPageContent, IPageHeader } from '../../types/interfaces';
import { View } from '../../types/enums';
import PageContent from '../PageContent/pageContent';
import PageHeader from '../PageHeader/pageHeader';

class App implements IApp {
  view: View;

  root: HTMLElement;

  pageHeader: IPageHeader;

  pageContent: IPageContent;

  constructor() {
    this.view = View.MAIN;
    this.root = document.getElementById('root') as HTMLElement;
    this.pageHeader = new PageHeader(this.view);
    this.pageContent = new PageContent(this.view);
  }

  async render() {
    this.root.insertAdjacentHTML('afterbegin', await this.pageHeader.render());
    this.root.insertAdjacentHTML('beforeend', await this.pageContent.render());
  }
}

export default App;
