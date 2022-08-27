import { View } from './enums';

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
  render: () => string;
}

export interface IPageFooter {
  render: () => void; 
}

export interface IDictionaryPage {
  render: () => void;
  setWordCard: (currentPage: number, currentGroup: number) => void;
  setWordInfo: (wordId: string) => void;
  renderWordCard: (wordEnglish: string, wordTranslate: string, wordBlockId: string) => HTMLDivElement;
  getWords: (group: number, page: number) => Promise<[]>;
  getWordById: (wordId: string) => Promise<{}>;
  listen: (target: HTMLElement) => void;
  nextPage: () => Promise<void>;
  prevPage: () => Promise<void>;
  updatePageAndGroup: (page: number, group: number) => void;
}