import { IApp, IPageContent, MainPage } from '../../types/interfaces';
import { View } from '../../types/enums';
import PageContent from '../PageContent/pageContent';
import Main from '../Main/mainPage';

class App implements IApp {
  view: View;

  pageContent: IPageContent;

  main: MainPage;

  constructor() {
    this.view = View.MAIN;
    this.pageContent = new PageContent(this.view);
    this.main = new Main();
  }

  render() {
    const root = document.querySelector('#root');
    if (root) root.insertAdjacentHTML('afterbegin', this.main.render());
  }
}

export default App;
