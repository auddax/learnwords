import { MainPage } from '../../types/interfaces';
import { Sections } from '../../types/enums';

class Main implements MainPage {
  sectionAppInfo: Sections;

  sectionOurTeam: Sections;

  sectionFooter: Sections;

  constructor() {
    this.sectionAppInfo = Sections.APPINFO;
    this.sectionOurTeam = Sections.OURTEAM;
    this.sectionFooter = Sections.FOOTER;
  }

  render() {
    return (`
    ${this.sectionAppInfo}
    ${this.sectionOurTeam}
    ${this.sectionFooter}
`);
  }
}
export default Main;
