import { View, Sections } from './enums';

export interface IApp {
  view: View;
  render: () => void;
}

export interface IPageContent {
  view: View;
  render: () => string;
}

export interface MainPage {
  sectionAppInfo: Sections;
  sectionOurTeam: Sections;
  sectionFooter: Sections;
  render: () => string;
}
