import { nameInputElement, formElement } from "./main.js";

const host = "https://wedev-api.sky.pro/api/v2/andrey_bakin/comments";
const hostLogin = "https://wedev-api.sky.pro/api/user/login";

export let token;

export const setToken = (newToken) => {
  token = newToken;
};

export function getCommentsFromModule(comments) {
  return fetch(host, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.json();
  });
}

export function postCommentsFromModule(text) {
  return fetch(host, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      text,
    }),
  })
  .then((response) => {
    if (response.status === 201) {
      return response;
    } else if (response.status === 500) {
      throw new Error("Ошибка сервера");
    } else if (response.status === 400) {
      throw new Error("Неверный запрос");
    }
  })
  .then((response) => {
    return response.json();
  })
  .catch((error) => {
    document.querySelector(".form-loading").style.display = "none";
    document.querySelector(".comment-form").style.display = "flex";
    if (error.message === "Ошибка сервера") {
      alert("Сервер сломался, попробуй позже");
    } else if (error.message === "Неверный запрос") {
      alert("Текст должен быть не короче 3 символов");
      text.classList.add("error");
      setTimeout(() => {
        text.classList.remove("error");
      }, 2000);
    } else {
      alert("Кажется, у вас сломался интернет, попробуйте позже");
    }
  });
}

export function loginUser(loginValue, passwordValue) {
  return fetch(hostLogin, {
    method: "POST",
    body: JSON.stringify({
      login: loginValue,
      password: passwordValue,
    }),
  })
    .then((response) => {
      if (response.status === 201) {
        return response;
      } else if (response.status === 400) {
        throw new Error("Ошибка 400");
      }
    })
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      setToken(responseData.user.token);
      document.querySelector(".comments").style.display = "block";
      formElement.classList.add(".comments");
      document.querySelector(".comment-form").style.display = "block";
      document.querySelector(".not-login").style.display = "none";
      document.querySelector(".login-form").style.display = "none";
      nameInputElement.value = responseData.user.name;
      nameInputElement.disabled = true;
    })
    .catch((error) => {
      if (error.message === "Ошибка 400") {
        alert("Неправильный логин или пароль");
      } else {
        alert("Кажется у вас сломался интернет, попробуйте позже");
      }
    });
}
