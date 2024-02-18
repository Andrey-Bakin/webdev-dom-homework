import { getCommentsFromModule, postCommentsFromModule } from "./api.js";
import { renderComments } from "./render.js";
import { formValidation } from "./formValidation.js";
import { setDate } from "./SetDate.js";

const buttonElement = document.getElementById("btnId");
const nameInputElement = document.getElementById("add-name-id");
const textInputElement = document.getElementById("add-text-id");
const formElement = document.getElementById("new-form");

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

function postComment(name, text) {
  return postCommentsFromModule(name, text)
    .then((response) => {
      if (response.status === 500) {
        throw new Error("Ошибка сервера");
      }

      if (response.status === 400) {
        throw new Error("Неверный запрос");
      }
    })
    .then(() => {
      return fetchComments();
    });
}

const name = document.getElementById("add-name-id");
const text = document.getElementById("add-text-id");

let comments = [];

let isLoading = true;
let isPosting = false;

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

nameInputElement.addEventListener("input", () => {
  if (nameInputElement.value != "") {
    buttonElement.disabled = false;
    return;
  }
});

textInputElement.addEventListener("input", () => {
  if (textInputElement.value != "") {
    buttonElement.disabled = false;
    return;
  }
});

buttonElement.addEventListener("click", () => {
  formValidation(nameInputElement, textInputElement, buttonElement);
  setDate();

  isPosting = true;
  document.querySelector(".form-loading").style.display = "block";
  document.querySelector(".new-form").style.display = "none";
  renderComments({ isLoading, comments });

  postComment(name.value, text.value)
    .then((data) => {
      name.value = "";
      text.value = "";
      document.querySelector(".form-loading").style.display = "none";
      document.querySelector(".new-form").style.display = "flex";
      isPosting = false;
      comments = data;
      renderComments({ isLoading, comments });
    })
    .catch((error) => {
      document.querySelector(".form-loading").style.display = "none";
      document.querySelector(".new-form").style.display = "flex";
      isPosting = false;

      if (error.message === "Ошибка сервера") {
        alert("Сервер сломался, попробуй позже");
      }

      if (error.message === "Неверный запрос") {
        alert("Имя и комментарий должны быть не короче 3 символов");

        name.classList.add("error");
        text.classList.add("error");
        setTimeout(() => {
          name.classList.remove("error");
          text.classList.remove("error");
        }, 2000);
      } else {
        alert("Кажется, у вас сломался интернет, попробуйте позже");
      }
    });

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
