import { GAMES, LEVEL, VIEW } from './enums';

export interface IApp {
  root: HTMLElement;
  pageHeader: IPageHeader;
  pageContent: IPageContent;
  pageFooter: IPageFooter
  render: () => void;
}

export interface IPageContent {
  view: VIEW | string | null;
  listen: (target: HTMLElement) => void;
  listenKey: (eventCode: string) => void;
  listenStorage: (key: string | null) => void;
  router: (path: string | undefined, popstate?: boolean) => void
  render: () => void;
}

export interface IPageHeader {
  listen: (target: HTMLElement) => void;
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

export interface IMainPage {
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
  [index: string]: string;
}

export interface IForm {
  [index: string]: string | FormDataEntryValue;
}

export interface ISprintGame {
  currentWordIndex: number;
  rightAnswers: number;
  rightAnswerWords: string[];
  wrongAnswerWords: string[];
  rowAnswers: number;
  score: number;
  words: IWords[];
  shuffledWords: IWords[];
  result: IGameResult;
  listen: (target: HTMLElement) => void;
  start: (words: IWords[]) => void;
  answerSprintGameMouse: (target: HTMLElement) => void;
  answerSprintGameKey: (eventCode: string) => void;
  render: (word: string, translate: string) => void;
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

export interface IGameResult {
  render: (
    rightAnswers: number,
    rightAnswerWords: string[],
    wrongAnswerWords: string[],
    totalWordsNumber: number,
  ) => void;
}

export interface IAudioChallenge {
  baseUrl: string;
  level: LEVEL;
  gameType: GAMES;
  start: IGameStart;
  listen: (target: HTMLElement) => void;
  render: () => void;
}

export interface IAudioChallengeGame {
  currentWordIndex: number;
  rightAnswers: number;
  rightAnswerWords: string[];
  wrongAnswerWords: string[];
  words: IWords[];
  pickedWords: IWords[];
  classPrefix: string;
  listen: (target: HTMLElement) => void;
  start: (words: IWords[]) => void;
  render: () => void;
}

export interface IDictionaryPage {
  render: () => void;
  setWordCard: (currentPage: number, currentGroup: number) => void;
  setWordInfo: (wordId: string) => void;
  renderWordCard: (
    wordEnglish: string,
    wordTranslate: string,
    wordBlockId: string
  ) => HTMLDivElement;
  getWords: (group: number, page: number) => Promise<[]>;
  getWordById: (wordId: string) => Promise<IWords>;
  listen: (target: HTMLElement) => void;
  listenStorage: (key: string | null) => void;
  nextPage: () => Promise<void>;
  prevPage: () => Promise<void>;
  updatePageAndGroup: (page: number, group: number) => void;
}

export interface IStatistics {
  render: () => void;
}

export interface I1FormData {
  key: number,
  value: string,
  render: () => void;
}

export interface IAuth {
  listen: (target: HTMLElement) => void;
  render: () => void;
}
