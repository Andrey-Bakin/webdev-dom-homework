import { likesButtonListeners, answerComment } from "./main.js"; 

const safeHtml = (htmlString) => {
    return htmlString.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  };

export function renderComments({ isLoading, comments }) {

    if (isLoading) {
        document.getElementById("comment-id").innerHTML =
            "Пожалуйста подождите, загружаю комментарии...";
        return;
    }

    document.getElementById("comment-id").innerHTML = comments
        .map((comment, index) => {
            return `<li class="comment" data-index="${index}">
        <div class="comment-header">
          <div>${safeHtml(comment.name)}</div>
          <div>${comment.date.toLocaleDateString()} ${comment.date.toLocaleTimeString()}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${safeHtml(comment.text)}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">
              <div>${comment.likes}</div>
            </span>
            <button class="${comment.isLiked ? "like-button -active-like" : "like-button"}" data-index = "${index}"></button>
            <div></div>
            </button>
          </div>
        </div>
      </li>`;
        })
        .join("");    
    likesButtonListeners();
    answerComment();
};

// renderComments({ comments });