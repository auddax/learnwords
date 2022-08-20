import { View } from './enums';

export interface IApp {
  view: View;
  render: () => void;
}

export interface IPageContent {
  view: View;
  render: () => string;
}

export interface MainPage {
  render: () => string;
}
