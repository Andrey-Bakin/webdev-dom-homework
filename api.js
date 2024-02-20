const host = "https://wedev-api.sky.pro/api/v1/andrey_bakin/comments";

export function getCommentsFromModule() {
    return fetch(host)
        .then((response) => response.json())
}

export function postCommentsFromModule(name, text) {
    return fetch(host, {
        method: "POST",
        body: JSON.stringify({
          name,
          text,
        })
      })
}