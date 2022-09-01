/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import environment from '../../environment/environment';
import { PATH } from '../../types/enums';
import { IAuth } from '../../types/interfaces';

import Loader from '../Loader/loader';

class Auth extends Loader implements IAuth {
  baseUrl: string;

  token: string;

  userId: string;

  constructor() {
    super();
    this.baseUrl = environment.baseUrl;
    this.token = '';
    this.userId = '';
  }

  listen(target: HTMLElement) {
    this.register(target);
  }

  render() {
    const main = document.querySelector('.page-content') as HTMLElement;
    if (main) {
      main.innerHTML = `
          <div class="container">
            <form id="registerForm">
              <h1 class="">Регистрация</h1>
              <label for="inputFirstName">Имя</label>
              <input type="text" name="name" id="inputFirstName" class="form-input" autofocus required>
              <label for="inputEmail">E-mail</label>
              <input type="email" name="email" id="inputEmail" class="form-input required>                          
              <label for="inputPassword">Пароль</label>
              <input type="password" name="password" id="inputPassword" class="form-input" required>
              <button class="button" type="button" id="submitRegisterForm">
                Создать
              </button>
            </form>
          </div>
      `;
    }
  }

  async register(target: HTMLElement) {
    if (target.id !== 'submitRegisterForm') return;
    const form = document.querySelector('#registerForm') as HTMLFormElement;
    const formData = new FormData(form);
    /*
    const obj: I1FormData = {};
    formData.forEach((value, key) => {
      obj[key] = value;
    });
    */
    const pathVars = { [PATH.USERS]: null };
    const params = { pathVars };

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Authorization', 'Bearer <Bearer Token>');

    const options = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(formData),
    };

    const response = await super.getResponse(params, options);
    console.log(response);
  }

  islogin() {
    if (this.token !== '' && this.userId !== '') {
      return true;
    }

    return false;
  }

  logout() {
    this.token = '';
    this.userId = '';
  }
}

export default Auth;
