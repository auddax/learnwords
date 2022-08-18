import { View } from './enums';

export interface IApp {
  view: View;
  render: () => void;
}

export interface IPageContent {
  view: View;
  render: () => Promise<string>;
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
