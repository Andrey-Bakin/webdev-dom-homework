import { loginUser, setToken, token } from "./api.js";

export const renderLogin = () => {
  const appElement = document.getElementById("app");
  const loginHtml = `
  <div id="login-form-id" class="container">
  <ul id="comment-id" class="comments"></ul>
  <form class="login-form" id="new-form">
    <div class="add-form">
      <strong class="add-form-header">Форма входа</strong>
      <input
        type="text"
        id="input-login-id"
        class="add-form-login"
        placeholder="Введите логин"
      />
      <input
        type="text"
        id="input-password-id"
        class="add-form-password"
        placeholder="Введите пароль"
      />
      <div id="add-form-id" class="add-form-row">
        <button id="login-button-id" class="login-form-button">Войти</button>
      </div>
      <div>
        <a class="reg-link" href="#"
          >Зарегистрироваться</a
        >
      </div>`;
  appElement.innerHTML = loginHtml;
};

const buttonLoginElement = document.getElementById("login-button-id");
const loginInputElement = document.getElementById("input-login-id");
const passwordInputElement = document.getElementById("input-password-id");
const loginFormElement = document.getElementById("login-form-id")


buttonLoginElement.addEventListener("click", () => {
  loginUser({
    login: loginInputElement.value,
    password: passwordInputElement.value,
   });
});

