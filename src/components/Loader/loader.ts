import environment from '../../environment/environment';
import { ILoader, RequestParams } from '../../types/interfaces';

class Loader implements ILoader {
  base: string;

  constructor() {
    this.base = environment.baseUrl;
  }

  makeUrl(params: RequestParams | undefined): string {
    const pathVars = params?.pathVars;
    const queryParams = params?.queryParams;
    let url = `${this.base}`;

    if (pathVars) {
      url += '/';
      Object.keys(pathVars).forEach((key) => {
        url += `${key}/`;
        if (pathVars[key]) url += `${pathVars[key]}/`;
      });
      url = url.slice(0, -1);
    }

    if (queryParams) {
      url += '?';
      Object.keys(queryParams).forEach((key) => {
        url += `${key}=${queryParams[key]}&`;
      });
      url = url.slice(0, -1);
    }

    return url;
  }

  async getResponse(params?: RequestParams, options?: RequestInit): Promise<Response> {
    const response = await fetch(this.makeUrl(params), options);
    return response;
  }
}

export default Loader;
