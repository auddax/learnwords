/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
/* eslint-disable max-lines-per-function */
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

  render() {
    this.render_sign_in();
  }

  listen(target: HTMLElement) {
    this.removeModal(target);
    this.addModal(target);
  }

  render_sign_in() {
    const main = document.querySelector('.page-content') as HTMLElement;
    if (main) main.insertAdjacentHTML('beforeend', this.sign_in_el());
    this.sign_in_action();
  }

  render_register() {
    const main = document.querySelector('.page-content') as HTMLElement;
    if (main) main.insertAdjacentHTML('beforeend', this.register_el());
    this.register_action();
  }

  removeModal(target: HTMLElement) {
    if (!target.classList.contains('popup')) return;
    target.remove();
  }

  addModal(target: HTMLElement) {
    if (target.id === 'renderRegisterWindow') {
      const popup = document.querySelector('.popup');
      if (popup) popup.remove();
      const main = document.querySelector('.page-content') as HTMLElement;
      if (main) main.insertAdjacentHTML('beforeend', this.register_el());
    } else if (target.id === 'renderSignInWindow') {
      const popup = document.querySelector('.popup');
      if (popup) popup.remove();
      const main = document.querySelector('.page-content') as HTMLElement;
      if (main) main.insertAdjacentHTML('beforeend', this.sign_in_el());
    }
  }

  sign_in_el() {
    return (`
        <div class="popup">
          <div class="popup__body">
            <h1 class="body__header">Welcome back!</h1>
            <div class="body__form">
                <form method="post" class="form" id="login-form-action">
                  <input type="email" name="email" id="input-email" class="form__input" placeholder="Email" autocomplete="off" required>
                  <input type="password" name="password" id="input-password" placeholder="Password" autocomplete="off" class="form__input" required>
                  <button class="form__button" type="submit">Register</button>
                  <div class="row" id="formResult"></div>
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

  async sign_in_action() {
    const elLoginFormAction = document.getElementById('login-form-action');
    if (elLoginFormAction) {
      elLoginFormAction.addEventListener('submit', (evt) => {
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
            console.log('res_ok');
            console.log(res);

            return res.json();
          }

          return Promise.reject(res);
        }).then((data) => {
          console.log(data);

          if (elFormResult) elFormResult.insertAdjacentHTML('beforeend', data.message);

          localStorage.setItem('userMessage', data.message);
          localStorage.setItem('userToken', data.token);
          localStorage.setItem('userRefreshToken', data.refreshToken);
          localStorage.setItem('userId', data.userId);
          localStorage.setItem('userName', data.name);

          this.token = data.userId;
          this.userId = data.token;
          this.setLifeTimeTokenCookie();
        }).catch((err) => {
          console.warn('catch');
          console.warn(err);

          if (elFormResult) elFormResult.insertAdjacentHTML('beforeend', err.statusText);
        });

        evt.preventDefault();
      }, true);
    }
  }

  register_el() {
    return (`
      <div class="popup">
        <div class="popup__body">
          <h1 class="body__header">Learn English with us!</h1>
          <div class="body__form">
            <form method="post" class="form" id="register-form-action">
              <input type="text" name="name" id="reg-input-first-name" class="form__input" placeholder="Username" autocomplete="off" required>
              <input type="email" name="email" id="reg-input-email" class="form__input" placeholder="Email" autocomplete="off" required>
              <input type="password" name="password" id="reg-input-password" placeholder="Password" autocomplete="off" class="form__input" required>
              <button class="form__button" type="submit">Register</button>
            </form>
            <div class="body__link">
              <span class="link-text">Already have an account?</span>
              <span class="link-button" id="renderSignInWindow">Sign in</span>
            </div>
          <div class="row" id="RegformResult"></div>
        </div>
      </div>
    `);
  }

  async register_action() {
    const elFormAction = document.getElementById('register-form-action');
    if (elFormAction) {
      elFormAction.addEventListener('submit', (evt) => {
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
            return res.json();
          } if (res.status === 417) {
            const message = ('<div class="err">You are even now exists in database, please create other user</div>');
            if (elFormResult) elFormResult.insertAdjacentHTML('beforeend', message);
          } else if (res.status === 422) {
            const message = (`Your email or your password is wrong.
                  At least 8 characters.
                  A mixture of both uppercase and lowercase letters.
                  A mixture of letters and numbers.
                  Include at least one special character, e.g., ! @ # ? ]
                  `);

            if (elFormResult) elFormResult.insertAdjacentHTML('beforeend', message);
          }
          return Promise.reject(res);
        }).then((data) => {
          console.log(data);

          if (elFormResult) elFormResult.insertAdjacentHTML('beforeend', data);
        }).catch((err) => {
          console.warn(err);

          if (elFormResult) elFormResult.insertAdjacentHTML('beforeend', err);
        });

        evt.preventDefault();
      }, true);
    }
  }

  islog_in() {
    if (this.token !== '' && this.userId !== '') {
      return true;
    }

    return false;
  }

  logout() {
    localStorage.removeItem('userMessage');
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRefreshToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    this.token = '';
    this.userId = '';
    this.redirect_to_login_page();
    this.deleteLifeTimeTokenCookie();
  }

  redirect_to_login_page() {
    // redirect to login page
  }

  setLifeTimeTokenCookie() {
    // document.cookie = `userToken=${this.token}; max-age=15120; Path=/;`;
    document.cookie = `userId=${this.userId}; max-age=15120; Path=/;`;
  }

  deleteLifeTimeTokenCookie() {
    // document.cookie = `userToken=${this.token}; max-age=1; Path=/;`;
    document.cookie = `userId=${this.userId}; max-age=1; Path=/;`;
  }

  async updateToken() {
    const getFetch = fetch(`https://rslng.herokuapp.com/users/${this.userId}/tokens`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'GET',
    }).then((res) => {
      if (res.ok) {
        console.log('res_ok');
        console.log(res);

        return res.json();
      }

      return Promise.reject(res);
    }).then((data) => {
      console.log(data);

      localStorage.setItem('userToken', data.token);
      localStorage.setItem('userRefreshToken', data.refreshToken);
      localStorage.setItem('userId', data.userId);

      this.token = data.userId;
      this.userId = data.token;
      this.setLifeTimeTokenCookie();
    }).catch((err) => {
      console.warn('catch');
      console.warn(err);
    });
  }
}
export default Auth;