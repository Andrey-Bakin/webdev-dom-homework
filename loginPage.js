import { loginUser } from "./api.js";

export const renderLogin = (getCommentsFromModule) => {
  const appElement = document.getElementById("app");
  const loginHtml = `
  <div id="login-form-id" class="container">
  <form class="login-form" id="comment-form">
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
      </div>`;
  appElement.innerHTML = loginHtml;

  const buttonLoginElement = document.getElementById("login-button-id");
  const loginInputElement = document.getElementById("input-login-id");
  const passwordInputElement = document.getElementById("input-password-id");
  const loginFormElement = document.getElementById("login-form-id");

  buttonLoginElement.addEventListener("click", () => {
    loginUser(loginInputElement.value, passwordInputElement.value);
  });

  loginFormElement.addEventListener("submit", (e) => {
    e.preventDefault();
    e.target.reset();
  });
};


