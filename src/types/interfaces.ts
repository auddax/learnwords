import { GAMES, LEVEL, View } from './enums';

export interface IApp {
  root: HTMLElement;
  pageHeader: IPageHeader;
  pageContent: IPageContent;
  pageFooter: IPageFooter
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
  queryParams?: IParams,
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
  gameType: GAMES;
  start: IGameStart;
  game: ISprintGame;
  listen: (target: HTMLElement) => void;
  listenKey: (eventCode: string) => void;
  render: () => void;
}

export interface IWords {
  [index: string]: string
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

export interface IPageFooter {
  render: () => void;
}

export interface IGames {
  listen: (target: HTMLElement) => void;
  listenKey: (eventCode: string) => void;
  render: () => void;
}

export interface IGameStart {
  header: string;
  description: string;
  render: () => void;
}

export interface IAudioChallenge {
  baseUrl: string;
  level: LEVEL;
  gameType: GAMES;
  start: IGameStart;
  listen: (target: HTMLElement) => void;
  render: () => void;
}
