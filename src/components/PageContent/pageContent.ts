import { View } from '../../types/enums';
import { IPageContent, MainPage } from '../../types/interfaces';
import Main from '../Main/mainPage';

class PageContent implements IPageContent {
  view: View;

  main: MainPage;

  constructor(view: View) {
    this.view = view;
    this.main = new Main();
  }

  render() {
    return (
      this.main.render()
    );
  }
}

export default PageContent;
