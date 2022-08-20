import { LEVEL, View } from './enums';

export interface IApp {
  root: HTMLElement;
  pageHeader: IPageHeader;
  pageContent: IPageContent;
  render: () => void;
}

export interface IPageContent {
  view: View;
  listen: (target: HTMLElement) => void;
  render: () => void;
}

export interface IPageHeader {
  render: () => void;
}

export interface IParams {
  [index: string]: string | number | null;
}

export interface RequestParams {
  pathVars: IParams,
  queryParams: IParams,
}

export interface ILoader {
  base: string;
  makeUrl: (params: RequestParams | undefined) => string;
  getResponse: (
    params?:RequestParams,
    options?: RequestInit
  ) => Promise<Response>;
}

export interface MainPage {
  render: () => void;
}

export interface ISprint {
  baseUrl: string;
  level: LEVEL;
  start: ISprintStart;
  game: ISprintGame;
  listen: (target: HTMLElement) => void;
  render: () => void;
}

export interface IWords {
  [index: string]: string
}

export interface ISprintStart {
  render: () => void;
}

export interface ISprintGame {
  render: (words: IWords[]) => void;
}
