import Event from '../utils/Event.js';
import { loginType, eventType } from '../types';

class Login implements loginType {
  private modal : HTMLElement = document.createElement('div');

  private login : HTMLElement = document.createElement('div');

  private event : eventType = new Event();

  private userInput : HTMLInputElement = document.createElement('input');

  private passwordInput : HTMLInputElement = document.createElement('input');

  private submit : HTMLButtonElement = document.createElement('button');

  constructor() {
    this.makeModal();
    this.makeLogin();
    this.onModalEvent();
    this.offModalEvent();
    this.onSubmit();
  }

  private onModalEvent() : void {
    this.event.setEvent('logIn', () => {
      this.modal.classList.remove('js-hide');
    });
  }

  private offModalEvent() : void {
    this.event.setEvent('modalOff', () => {
      this.modal.classList.add('js-hide');
    });
  }

  private makeModal() : void {
    this.modal.classList.add('modal');
    window.document.body.append(this.modal);
    this.modal.classList.add('js-hide');
  }

  private makeLogin() : void {
    this.login.classList.add('login');
    const labelForUser = document.createElement('label');
    labelForUser.htmlFor = 'js-login-user-name';
    labelForUser.innerText = '사용자 이름';
    this.userInput.id = 'js-login-user-name';
    this.userInput.classList.add('input');
    this.userInput.type = 'text';
    const labelForPassword = document.createElement('label');
    labelForPassword.htmlFor = 'js-login-password';
    labelForPassword.innerText = '비밀번호';
    this.passwordInput.id = 'js-login-password';
    this.passwordInput.classList.add('input');
    this.passwordInput.type = 'password';
    this.submit.classList.add('input');
    this.submit.innerText = '로그인';
    this.login.appendChild(labelForUser);
    this.login.appendChild(this.userInput);
    this.login.appendChild(labelForPassword);
    this.login.appendChild(this.passwordInput);
    this.login.appendChild(this.submit);
    this.modal.appendChild(this.login);
  }

  private onSubmit() : void {
    if (this.submit === null) return;
    this.submit.addEventListener('click', () => {
      if (this.userInput === null) return;
      const id : string = (<HTMLInputElement> this.userInput).value;
      if (this.passwordInput === null) return;
      const password : string = (<HTMLInputElement> this.passwordInput).value;
      this.event.dispatch('onlogin', { id, password });
    });
  }
}

export default Login;
