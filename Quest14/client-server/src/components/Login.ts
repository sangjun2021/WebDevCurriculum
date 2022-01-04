import Event from '../utils/Event.js';

class Login {
  private modal : HTMLElement | null = null;

  private login : HTMLElement | null = null;

  private event : any = new Event();

  private userInput : HTMLElement | null = null;

  private passwordInput : HTMLElement | null = null;

  private submit : HTMLElement | null = null;

  constructor() {
    this.makeModal();
    this.makeLogin(this.modal);
    this.onModalEvent();
    this.offModalEvent();
    this.onSubmit();
  }

  private onModalEvent() : void {
    this.event.setEvent('logIn', () => {
      if (this.modal === null) return;
      this.modal.classList.remove('js-hide');
    });
  }

  private offModalEvent() : void {
    this.event.setEvent('modalOff', () => {
      if (this.modal === null) return;
      this.modal.classList.add('js-hide');
    });
  }

  private makeModal() : void {
    this.modal = document.createElement('div');
    this.modal.classList.add('modal');
    window.document.body.append(this.modal);
    this.modal.classList.add('js-hide');
  }

  private makeLogin(target: HTMLElement | null) : void {
    this.login = document.createElement('div');
    this.login.classList.add('login');
    this.login.innerHTML = `
    <label for="js-login-user-name">사용자 이름</label>
    <input type="text" name="user-name" id="js-login-user-name" class="input" />
    <label for="js-login-password">비밀번호</label>
    <input type="password" name="password" id="js-login-password" class="input" />
    <button class="input" id="js-login-submit">로그인</button>
    `;
    if (target === null) return;
    target.appendChild(this.login);
    this.userInput = document.getElementById('js-login-user-name');
    this.passwordInput = document.getElementById('js-login-password');
    this.submit = document.getElementById('js-login-submit');
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
