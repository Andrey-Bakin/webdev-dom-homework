import { nameInputElement } from "./main.js";


const host = "https://wedev-api.sky.pro/api/v2/andrey_bakin/comments";
const hostLogin = "https://wedev-api.sky.pro/api/user/login";
// "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";
export let token;

export const setToken = (newToken) => {
  token = newToken;
};

export function getCommentsFromModule(comments) {
  return fetch(host, {
    method: "GET",
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
  }).then((response) => {
    return response.json();
  });
}



export function loginUser({ addLogin, addPassword }) {
  return fetch(hostLogin, {
    method: "POST",
    body: JSON.stringify({
      login: addLogin,
      password: addPassword,
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
      console.log(responseData);
      setToken(responseData.user.token);
      getCommentsFromModule();
      document.querySelector(".new-form").style.display = "block";
      document.querySelector(".not-login").style.display = "none";
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
