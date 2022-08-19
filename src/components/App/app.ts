import { IApp, IPageContent, IPageHeader } from '../../types/interfaces';
import { View } from '../../types/enums';
import PageContent from '../PageContent/pageContent';
import PageHeader from '../PageHeader/pageHeader';

class App implements IApp {
  view: View;

  pageHeader: IPageHeader;

  pageContent: IPageContent;

  constructor() {
    this.view = View.MAIN;
    this.pageHeader = new PageHeader(this.view);
    this.pageContent = new PageContent(this.view);
  }

  async render() {
    const root = document.querySelector('#root');
    if (root) {
      root.insertAdjacentHTML('afterbegin', await this.pageHeader.render());
      root.insertAdjacentHTML('beforeend', await this.pageContent.render());
    }
  }
}

export default App;
