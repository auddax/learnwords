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
  listenKey: (eventCode: string) => void;
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
  view: string;
  start: ISprintStart;
  game: ISprintGame;
  listen: (target: HTMLElement) => void;
  listenKey: (eventCode: string) => void;
  render: () => void;
}

export interface IWords {
  [index: string]: string
}

export interface ISprintStart {
  render: () => void;
}

export interface ISprintResult {
  render: (score: number) => void;
}

export interface ISprintGame {
  currentWordIndex: number;
  score: number;
  words: IWords[];
  shuffledWords: IWords[];
  result: ISprintResult;
  listen: (target: HTMLElement) => void;
  start: (words: IWords[]) => void;
  answerSprintGameMouse: (target: HTMLElement) => void;
  answerSprintGameKey: (eventCode: string) => void;
  render: (word: string, translate: string, score: number) => void;
}
