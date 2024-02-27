import {
  getCommentsFromModule,
  postCommentsFromModule, } from "./api.js";
import { renderComments } from "./render.js";
import { formValidation } from "./formValidation.js";
import { setDate } from "./SetDate.js";
import { renderLogin } from "./loginPage.js";

export const buttonElement = document.getElementById("btn-id");
export const nameInputElement = document.getElementById("add-name-id");
export const textInputElement = document.getElementById("add-text-id");
export const formElement = document.getElementById("comment-form");
export const authLinklElement = document.querySelector(".auth-link");

function fetchComments() {
  return getCommentsFromModule().then((responseData) => {
    return responseData.comments.map((comment) => {
      return {
        name: comment.author.name,
        date: new Date(comment.date),
        text: comment.text,
        likes: comment.likes,
        isLiked: false,
      };
    });
  });
}

function postComment(text) {
  return postCommentsFromModule(text)
    .then(() => {
      return fetchComments();
    });
}

const name = document.getElementById("add-name-id");
const text = document.getElementById("add-text-id");

let comments = [];

let isLoading = true;
let isPosting = false;
let notLogin = true;

if ((notLogin = true)) {
  document.querySelector(".not-login").style.display = "block";
  document.querySelector(".comment-form").style.display = "none";
}

authLinklElement.addEventListener("click", () => {
  document.getElementById("comment-id").style.display = "none";
  document.querySelector(".comment-form").style.display = "none";
  document.querySelector(".not-login").style.display = "none";
  renderLogin(getCommentsFromModule);
});

renderComments({ isLoading, comments });

fetchComments()
  .then((data) => {
    comments = data;
    isLoading = false;
    renderComments({ isLoading, comments });
  })
  .catch((error) => {
    alert(error.message);
  });

formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  // e.target.reset();
});

export const likesButtonListeners = () => {
  const likesButtonElement = document.querySelectorAll(".like-button");
  for (const likeButton of likesButtonElement) {
    likeButton.addEventListener("click", (event) => {
      event.stopPropagation();
      const index = likeButton.dataset.index;
      if (comments[index].isLiked === false) {
        comments[index].isLiked = true;
        comments[index].likes++;
        likeButton.classList.add("-active-like");
      } else {
        comments[index].isLiked = false;
        comments[index].likes--;
        likeButton.classList.remove("-active-like");
      }
      renderComments({ isLoading, comments });
    });
  }
};

textInputElement.addEventListener("input", () => {
  if (textInputElement.value != "") {
    buttonElement.disabled = false;
    return;
  }
});

buttonElement.addEventListener("click", () => {
  formValidation(textInputElement, buttonElement);
  setDate();

  isPosting = true;
  document.querySelector(".form-loading").style.display = "block";
  document.querySelector(".comment-form").style.display = "none";
  renderComments({ isLoading, comments });

  postComment(text.value)
    .then((data) => {
      text.value = "";
      document.querySelector(".form-loading").style.display = "none";
      document.querySelector(".comment-form").style.display = "flex";
      isPosting = false;
      comments = data;
      renderComments({ isLoading, comments });
    })
  renderComments({ isLoading, comments });
});

export function answerComment() {
  const commentsAnswer = document.querySelectorAll(".comment");
  const formText = document.querySelectorAll(".add-form-text");
  const textInputElement = document.getElementById("add-text-id");
  commentsAnswer.forEach((comment, index) => {
    comment.addEventListener("click", () => {
      textInputElement.value = `> ${comments[index].name} \n ${comments[index].text}`;
    });
  });
}

console.log("It works!");
