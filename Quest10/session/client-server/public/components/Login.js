import Event from "../utils/Event.js";
class Login {
  #modal;
  #login;
  #event = new Event();
  #userInput;
  #passwordInput;
  #submit;
  constructor() {
    this.#makeModal();
    this.#makeLogin(this.#modal);
    this.#onModalEvent();
    this.#offModalEvent();
    this.#onSubmit();
  }
  #onModalEvent() {
    this.#event.setEvent("logIn", (e) => {
      this.#modal.classList.remove("js-hide");
    });
  }
  #offModalEvent() {
    this.#event.setEvent("modalOff", (e) => {
      this.#modal.classList.add("js-hide");
    });
  }
  #makeModal() {
    this.#modal = document.createElement("div");
    this.#modal.classList.add("modal");
    window.document.body.append(this.#modal);
    this.#modal.classList.add("js-hide");
  }
  #makeLogin(target) {
    this.#login = document.createElement("div");
    this.#login.classList.add("login");
    this.#login.innerHTML = `
    <label for="js-login-user-name">사용자 이름</label>
    <input type="text" name="user-name" id="js-login-user-name" class="input" />
    <label for="js-login-password">비밀번호</label>
    <input type="password" name="password" id="js-login-password" class="input" />
    <button class="input" id="js-login-submit">로그인</button>
    `;
    target.appendChild(this.#login);
    this.#userInput = document.getElementById("js-login-user-name");
    this.#passwordInput = document.getElementById("js-login-password");
    this.#submit = document.getElementById("js-login-submit");
  }
  #onSubmit() {
    this.#submit.addEventListener("click", () => {
      const id = this.#userInput.value;
      const password = this.#passwordInput.value;
      this.#event.dispatch("onlogin", { id, password });
    });
  }
}

export default Login;
