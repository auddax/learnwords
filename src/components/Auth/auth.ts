/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
import { VIEW } from '../../types/enums';
import './auth.scss';

class Auth {
  token: string | null;

  userId: string | null;

  userRefreshToken: string | null;

  constructor() {
    this.token = localStorage.getItem('userId');
    this.userId = localStorage.getItem('userToken');
    this.userRefreshToken = localStorage.getItem('userRefreshToken');
  }

  render(): void {
    this.render_sign_in();
  }

  listen(target: HTMLElement): void {
    this.removeModal(target);
    this.addModal(target);
    this.sign_in_action(target);
    this.sign_out_action(target);
    this.register_action(target);
  }

  render_sign_in(): void {
    const main = document.querySelector('.page-content') as HTMLElement;
    if (main) main.insertAdjacentHTML('beforeend', this.sign_in_el());
    document.body.style.overflow = 'hidden';
  }

  render_register(): void {
    const main = document.querySelector('.page-content') as HTMLElement;
    if (main) main.insertAdjacentHTML('beforeend', this.register_el());
    document.body.style.overflow = 'hidden';
  }

  removeModal(target: HTMLElement): void {
    if (!target.classList.contains('popup')) return;
    document.body.style.overflow = 'auto';
    target.remove();
    window.history.back();
  }

  addModal(target: HTMLElement): void {
    if (target.id === 'renderRegisterWindow') {
      const popup = document.querySelector('.popup');
      if (popup) popup.remove();
      const main = document.querySelector('.page-content') as HTMLElement;
      if (main) main.insertAdjacentHTML('beforeend', this.register_el());
      document.body.style.overflow = 'hidden';
    } else if (target.id === 'renderSignInWindow') {
      const popup = document.querySelector('.popup');
      if (popup) popup.remove();
      const main = document.querySelector('.page-content') as HTMLElement;
      if (main) main.insertAdjacentHTML('beforeend', this.sign_in_el());
      document.body.style.overflow = 'hidden';
    }
  }

  sign_in_el(): string {
    return (`
        <div class="popup">
          <div class="popup__body">
            <h1 class="body__header">С возвращением!</h1>
            <div class="body__form">
                <form method="post" class="form">
                  <input type="email" name="email" id="input-email" class="form__input" placeholder="Email" autocomplete="off" required>
                  <input type="password" name="password" id="input-password" placeholder="Password" autocomplete="off" class="form__input" required>
                  <button class="form__button" type="button" id="login-form-action">Войти</button>
                  <div class="row form__message" id="formResult"></div>
                </form>
            </div>
            <div class="body__link">
              <span class="link-text">Еще не зарегистрированы?</span>
              <span class="link-button" id="renderRegisterWindow">Создать аккаунт!</span>
            </div>
          </div>
        </div>
      `);
  }

  sign_in_first(): string {
    return (`
        <div class="popup">
          <div class="popup__body">
            <h1 class="body__header">Поздравляем!</h1>
            <p class="body__subheader">Вы успешно зарегистрировались</p>
            <p class="body__subheader">Пожалуйста войдите в свой аккаунт</p>
            <div class="body__form">
                <form method="post" class="form">
                  <input type="email" name="email" id="input-email" class="form__input" placeholder="Email" autocomplete="off" required>
                  <input type="password" name="password" id="input-password" placeholder="Password" autocomplete="off" class="form__input" required>
                  <button class="form__button" type="button" id="login-form-action">Войти</button>
                  <div class="row form__message" id="formResult"></div>
                </form>
            </div>
          </div>
        </div>
      `);
  }

  async sign_in_action(target: HTMLElement) {
    if (target.id === 'login-form-action') {
      const ELInputEmail = document.getElementById('input-email') as HTMLInputElement;
      const ELInputPassword = document.getElementById('input-password') as HTMLInputElement;

      const userData = {
        email: ELInputEmail.value,
        password: ELInputPassword.value,
      };

      const elFormResult = document.getElementById('formResult');

      const getFetch = fetch('https://rslng.herokuapp.com/signin', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(userData),
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(res);
      }).then((data) => {
        this.set_userlocalstorage(data);
        this.setLifeTimeTokenCookie();
        this.token = data.token;
        this.userId = data.userId;
        this.show_user_name(data.name);
      }).catch((err) => {
        let message = '';
        if (err.status === 404) {
          message = 'Пользователь не найден';
        } else if (err.status === 403) {
          message = 'Пароль неверен';
        }
        if (elFormResult) elFormResult.innerHTML = message;
      });
    }
  }

  sign_out_action(target: HTMLElement): void {
    if (!target.classList.contains('menu__button-signout')) return;
    const menu = document.querySelector('.header__menu .menu-item:last-child');
    if (menu) {
      menu.innerHTML = `
      <button class="menu__button-signin link" data-href="${VIEW.SIGNIN}">Войти</button>
      `;
    }
    this.logout();
  }

  show_user_name(name: string): void {
    const popup = document.querySelector('.popup');
    const menu = document.querySelector('.header__menu .menu-item:last-child');
    if (popup) popup.remove();
    document.body.style.overflow = 'auto';
    if (menu) {
      menu.innerHTML = `
        <span class="menu__username">${name}</span>
        <button class="menu__button-signout" data-href="${VIEW.SIGNOUT}">Выйти</button>
      `;
    }
    window.history.back();
  }

  get_datetime(set_hours = 0) {
    const now = new Date();
    if (set_hours > 0) now.setHours(now.getHours() + set_hours);
    return now.toLocaleString();
  }

  register_el(): string {
    return (`
      <div class="popup">
        <div class="popup__body">
          <h1 class="body__header">Учи английский вместе с нами!</h1>
          <div class="body__form">
            <form method="post" class="form">
              <input type="text" name="name" id="reg-input-first-name" class="form__input" placeholder="Username" autocomplete="off" required>
              <input type="email" name="email" id="reg-input-email" class="form__input" placeholder="Email" autocomplete="off" required>
              <input type="password" name="password" id="reg-input-password" placeholder="Password" autocomplete="off" class="form__input" required>
              <button class="form__button" type="button" id="register-form-action">Регистрация</button>
              <div class="row form__message" id="RegformResult"></div>
            </form>
            <div class="body__link">
              <span class="link-text">Уже зарегистрированы?</span>
              <span class="link-button" id="renderSignInWindow">Войти</span>
            </div>
        </div>
      </div>
    `);
  }

  async register_action(target: HTMLElement) {
    const elFormAction = document.getElementById('register-form-action');
    if (target.id === 'register-form-action') {
      const ELInputFirstName = document.getElementById('reg-input-first-name') as HTMLInputElement;
      const ELInputEmail = document.getElementById('reg-input-email') as HTMLInputElement;
      const ELInputPassword = document.getElementById('reg-input-password') as HTMLInputElement;
      const elFormResult = document.getElementById('RegformResult') as HTMLInputElement;
      const createUserData = {
        name: ELInputFirstName.value,
        email: ELInputEmail.value,
        password: ELInputPassword.value,
      };
      const vbody = JSON.stringify(createUserData);

      const getFetch = fetch('https://rslng.herokuapp.com/users', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: vbody,
      }).then((res) => {
        if (res.ok) {
          const popup = document.querySelector('.popup');
          if (popup) popup.remove();
          const main = document.querySelector('.page-content') as HTMLElement;
          if (main) main.insertAdjacentHTML('beforeend', this.sign_in_first());
          document.body.style.overflow = 'hidden';
          return res.json();
        }
        return Promise.reject(res);
      }).catch((err) => {
        let message = '';
        if (err.status === 417) {
          message = 'Пользователь уже существует';
        } else if (err.status === 422) {
          message = `<p>Адрес электронной почты или пароль неверны.</p>
          <p>Пароль должен быть не менее 8 символов<p>`;
        }

        if (elFormResult) elFormResult.innerHTML = message;
      });
    }
  }

  islog_in() {
    if (this.token !== '' && this.userId !== '') {
      const userTokenLifeTime: string | null = localStorage.getItem('userTokenLifeTime');
      if (userTokenLifeTime != null && this.get_datetime() >= userTokenLifeTime) {
        this.updateToken();
      }
      return true;
    }

    return false;
  }

  logout() {
    this.clean_userlocalstorage();
    this.deleteLifeTimeTokenCookie();
    this.token = '';
    this.userId = '';
  }

  set_userlocalstorage(data: {
    message: string; token: string;
    refreshToken: string; userId: string; name: string; }) {
    localStorage.setItem('userMessage', data.message);
    localStorage.setItem('userToken', data.token);
    localStorage.setItem('userRefreshToken', data.refreshToken);
    localStorage.setItem('userId', data.userId);
    localStorage.setItem('userName', data.name);
    document.dispatchEvent(new StorageEvent('storage', {
      key: 'userName',
    }));
  }

  clean_userlocalstorage() {
    localStorage.removeItem('userMessage');
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRefreshToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    document.dispatchEvent(new StorageEvent('storage', {
      key: 'userName',
    }));
  }

  setLifeTimeTokenCookie() {
    localStorage.setItem('userTokenLifeTime', this.get_datetime(4));
  }

  deleteLifeTimeTokenCookie() {
    localStorage.removeItem('userTokenLifeTime');
  }

  async updateToken() {
    const getFetch = fetch(`https://rslng.herokuapp.com/users/${this.userId}/tokens`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userRefreshToken')}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'GET',
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      if (res.status === 401) {
        this.logout();
      }

      return Promise.reject(res);
    }).then((data) => {
      localStorage.setItem('userToken', data.token);
      localStorage.setItem('userRefreshToken', data.refreshToken);

      this.token = data.token;
      this.setLifeTimeTokenCookie();
    });
  }
}
export default Auth;
