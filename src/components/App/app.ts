import { IApp, IPageContent } from '../../types/interfaces';
import { View } from '../../types/enums';
import PageContent from '../PageContent/pageContent';

class App implements IApp {
  view: View;

  pageContent: IPageContent;

  constructor() {
    this.view = View.MAIN;
    this.pageContent = new PageContent(this.view);
  }

  render() {
    const root = document.querySelector('#root');
    if (root) root.insertAdjacentHTML('afterbegin', this.pageContent.render());
  }
}

export default App;
