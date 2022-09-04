/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
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
            <h1 class="body__header">Welcome back!</h1>
            <div class="body__form">
                <form method="post" class="form">
                  <input type="email" name="email" id="input-email" class="form__input" placeholder="Email" autocomplete="off" required>
                  <input type="password" name="password" id="input-password" placeholder="Password" autocomplete="off" class="form__input" required>
                  <button class="form__button" type="button" id="login-form-action">Sign in</button>
                  <div class="row form__message" id="formResult"></div>
                </form>
            </div>
            <div class="body__link">
              <span class="link-text">Don’t have an account?</span>
              <span class="link-button" id="renderRegisterWindow">Sign up for free!</span>
            </div>
          </div>
        </div>
      `);
  }

  sign_in_first(): string {
    return (`
        <div class="popup">
          <div class="popup__body">
            <h1 class="body__header">Congitulations!</h1>
            <p class="body__subheader">You have successfully registered</p>
            <p class="body__subheader">Please sign into your account</p>
            <div class="body__form">
                <form method="post" class="form">
                  <input type="email" name="email" id="input-email" class="form__input" placeholder="Email" autocomplete="off" required>
                  <input type="password" name="password" id="input-password" placeholder="Password" autocomplete="off" class="form__input" required>
                  <button class="form__button" type="button" id="login-form-action">Sign in</button>
                  <div class="row form__message" id="formResult"></div>
                </form>
            </div>
          </div>
        </div>
      `);
  }

  async sign_in_action(target: HTMLElement) {
    if (target.id === 'login-form-action') {
      console.log('sign_in_action = ');

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
        this.clean_userlocalstorage();
        this.set_userlocalstorage(data);
        this.setLifeTimeTokenCookie();
        this.token = data.token;
        this.userId = data.userId;

        this.show_user_name(data.name);
      }).catch((err) => {
        let message = '';
        if (err.status === 404) {
          message = 'User not found';
        } else if (err.status === 403) {
          message = 'Wrong password';
        }
        if (elFormResult) elFormResult.innerHTML = message;
      });
    }
  }

  sign_out_action(target: HTMLElement): void {
    if (target.id !== 'signout') return;
    const menu = document.querySelector('.header__menu .menu-item:last-child');
    if (menu) {
      menu.innerHTML = `
        <button class="menu__button-signin" id="signin">Sign in</button>
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
        <button class="menu__button-signout" id="signout">Sign out</button>
      `;
    }
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
          <h1 class="body__header">Learn English with us!</h1>
          <div class="body__form">
            <form method="post" class="form">
              <input type="text" name="name" id="reg-input-first-name" class="form__input" placeholder="Username" autocomplete="off" required>
              <input type="email" name="email" id="reg-input-email" class="form__input" placeholder="Email" autocomplete="off" required>
              <input type="password" name="password" id="reg-input-password" placeholder="Password" autocomplete="off" class="form__input" required>
              <button class="form__button" type="button" id="register-form-action">Register</button>
              <div class="row form__message" id="RegformResult"></div>
            </form>
            <div class="body__link">
              <span class="link-text">Already have an account?</span>
              <span class="link-button" id="renderSignInWindow">Sign in</span>
            </div>
        </div>
      </div>
    `);
  }

  async register_action(target: HTMLElement) {
    const elFormAction = document.getElementById('register-form-action');
    if (target.id === 'register-form-action') {
      console.log('register_action = ');

      const ELInputFirstName = document.getElementById('reg-input-first-name') as HTMLInputElement;
      const ELInputEmail = document.getElementById('reg-input-email') as HTMLInputElement;
      const ELInputPassword = document.getElementById('reg-input-password') as HTMLInputElement;
      const elFormResult = document.getElementById('RegformResult') as HTMLInputElement;
      const createUserData = {
        name: ELInputFirstName.value,
        email: ELInputEmail.value,
        password: ELInputPassword.value,
      };
      console.log(createUserData);
      const vbody = JSON.stringify(createUserData);
      console.log(vbody);

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
          message = 'User already exists';
        } else if (err.status === 422) {
          message = `<p>Your email or your password is wrong.</p>
          <p>Password needs at least 8 characters<p>`;
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
        console.log('islog_in-updateToken');
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
    this.redirect_to_page('/main');
  }

  set_userlocalstorage(data: {
    message: string; token: string;
    refreshToken: string; userId: string; name: string; }) {
    localStorage.setItem('userMessage', data.message);
    localStorage.setItem('userToken', data.token);
    localStorage.setItem('userRefreshToken', data.refreshToken);
    localStorage.setItem('userId', data.userId);
    localStorage.setItem('userName', data.name);
  }

  clean_userlocalstorage() {
    localStorage.removeItem('userMessage');
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRefreshToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
  }

  redirect_to_page(page: string) {
    // redirect to login page
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
        console.log('updateToken_OKi');
        console.log(res);

        return res.json();
      }

      if (res.status === 401) {
        this.redirect_to_page('auth/login'); // TODO:
        this.logout();
      }

      return Promise.reject(res);
    }).then((data) => {
      console.log(data);

      localStorage.setItem('userToken', data.token);
      localStorage.setItem('userRefreshToken', data.refreshToken);

      this.token = data.token;
      this.setLifeTimeTokenCookie();
    }).catch((err) => {
      console.warn('catch');
      console.warn(err);
    });
  }
}
export default Auth;
