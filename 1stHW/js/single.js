const urlSearchParams = new URLSearchParams(window.location.search);
const postIndex = urlSearchParams.get("post");

// vars holding page elements:
const loader = document.getElementById("loader");
const mainContainer = document.getElementById("main-container");
const index = document.getElementById("post-index");
const title = document.getElementById("post-title");
const author = document.getElementById("post-author");
const content = document.getElementById("post-content");
const commentsWrapper = document.getElementById("comments-wrapper");
const sendBtn = document.getElementById("publish");

(function getInfo() {
  fetch(`https://jsonplaceholder.typicode.com/posts/${postIndex}`)
    .then((res) => res.json())
    .then((json) => {
      const authorId = json.userId;
      const getAuthor = fetch(
        `https://jsonplaceholder.typicode.com/users/${authorId}`
      ).then((res) => res.json());
      const getComments = fetch(
        `https://jsonplaceholder.typicode.com/posts/${postIndex}/comments`
      ).then((res) => res.json());
      Promise.all([getAuthor, getComments]).then(([user, comments]) =>
        createPage(json, user.name, comments)
      );
    });
})();

function createPage(post, authorName, comments) {
  // inserting post data:
  index.innerText += " " + post.id;
  title.innerText += " " + post.title;
  author.innerText += " " + authorName;
  content.innerText += post.body;
  //generating comments:
  comments.map(generateComment);
}

function generateComment(comment) {
  const container = document.createElement("div");
  const commentElements = {
    index: document.createElement("span"),
    title: document.createElement("div"),
    email: document.createElement("div"),
    body: document.createElement("p"),
  };
  const { index, title, email, body } = commentElements;
  index.innerText = comment.id;
  title.innerText = comment.name;
  email.innerText = comment.email;
  body.innerText = comment.body;

  container.classList.add("comment-container");
  index.classList.add("comment-index");
  title.classList.add("comment-title");
  email.classList.add("comment-email");
  body.classList.add("comment-body");

  for (element in commentElements) {
    container.appendChild(commentElements[element]);
  }
  commentsWrapper.appendChild(container);
  loader.style.display = "none";
  mainContainer.style.display = "block";

  if (comment.new) {
    container.classList.add("new");
    container.id = "comment" + comment.id;
    const newComment = document.getElementById(container.id);
    newComment.scrollIntoView();
    newComment.style.backgroundColor = "#FDFF47";
    setTimeout(() => {
      newComment.style.backgroundColor = "initial";
    }, 2000);
  }
}

function publishComment() {
  const title = document.getElementById("title");
  const email = document.getElementById("email");
  const content = document.getElementById("content");
  if (!title.value || !email.value || !content.value) {
    alert("all fields must be filled");
    return;
  }
  fetch("https://jsonplaceholder.typicode.com/comments", {
    method: "POST",
    body: JSON.stringify({
      postId: postIndex,
      name: title.value,
      email: email.value,
      body: content.value,
      new: true,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => generateComment(json));

  [title.value, email.value, content.value] = [null, null, null];
}

sendBtn.addEventListener("click", (e) => {
  publishComment();
});
