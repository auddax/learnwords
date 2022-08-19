import { View } from '../../types/enums';
import { IPageContent } from '../../types/interfaces';

class PageContent implements IPageContent {
  view: View;

  constructor(view: View) {
    this.view = view;
  }

  async render() {
    return (`
      <h1>${this.view} page is under construction 🛠️</h1>
    `);
  }
}

export default PageContent;
