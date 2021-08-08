// vars holding page elements:
const blogWrapper = document.getElementById("posts-wrapper");
const loader = document.getElementById("loader");
const createBtn = document.getElementById("create-post");
const overlay = document.getElementById("overlay");
const NewPostForm = document.getElementById("new-post-modal");
const postBtn = document.getElementById("publish");
const closeModal = document.getElementById("close-modal");

// variables to hold posts and user info:
let posts, users;
// var for indexing user created posts:
let userPostId = 500;

// IIFE for fetching info from server then creating posts based on the info:
// prettier-ignore
(function getInfo() {
  const getPosts = fetch("https://jsonplaceholder.typicode.com/posts")
  .then(
    (res) => res.json()
  );
  const getUsers = fetch("https://jsonplaceholder.typicode.com/users")
  .then(
    (res) => res.json()
  );
  Promise.all([getPosts, getUsers]).then(([postsRes, usersRes]) => {
    [posts, users] = [postsRes, usersRes];
    posts.map(post => generatePost(post));
    loader.style.display = "none";
  }
    
  );
})();

//main post generating function:
function generatePost(post) {
  // create elements to hold post content:
  const container = document.createElement("div");
  const postElements = {
    index: document.createElement("span"),
    title: document.createElement("a"),
    author: document.createElement("h4"),
    content: document.createElement("p"),
  };

  // inserting data to empty elements:
  const { index, title, author, content } = postElements;
  index.innerText = post.newId ? post.newId : post.id;
  title.innerText = post.title;
  // getting the posts author from user list or from author property depending on post's source:
  !post.new
    ? (author.innerText = users.filter(
        (user) => user.id == post.userId
      )[0].name)
    : (author.innerText = post.author);
  content.innerText = post.body.split(" ").slice(0, 5).join(" ") + "...";

  //adding classes to added elements:
  container.classList.add("post-container");
  index.classList.add("post-index");
  title.classList.add("post-title");
  author.classList.add("post-author");
  content.classList.add("post-content");

  //adding link for viewing post content:
  title.href = `./single-post.html?post=${post.id}`;

  //inserting elements in the DOM:
  for (const element in postElements) {
    container.appendChild(postElements[element]);
    blogWrapper.appendChild(container);
  }
  // scroll to post if the post was added by the user:
  if (post.new) {
    container.classList.add("new");
    container.id = "post" + post.newId;
    const newPost = document.getElementById(container.id);
    newPost.scrollIntoView();
    loader.style.display = "none";
    newPost.style.backgroundColor = "#FDFF47";
    setTimeout(() => {
      newPost.style.backgroundColor = "#afddff";
    }, 2000);
  }
}

// user post publishing function:
function publishPost() {
  // getting input fields value:
  const name = document.getElementById("new-name");
  const title = document.getElementById("new-title");
  const content = document.getElementById("new-content");
  if (!name.value || !title.value || !content.value) {
    alert("all fields must be filled");
    return;
  }
  // showing loader, closing modal and restoring body scroll
  loader.style.display = "block";
  NewPostForm.style.display = "none";
  overlay.style.display = "none";
  document.querySelector("body").style.overflow = "auto";
  // sending values to server:
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title: title.value,
      author: name.value,
      body: content.value,
      new: true,
      newId: ++userPostId,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      generatePost(json);
    });
  [name.value, title.value, content.value] = [null, null, null];
}

// event to open create post modal:
createBtn.addEventListener("click", (e) => {
  NewPostForm.style.display = "flex";
  overlay.style.display = "block";
  document.querySelector("body").style.overflow = "hidden";
});

//event for closing modal:
closeModal.addEventListener("click", (e) => {
  NewPostForm.style.display = "none";
  overlay.style.display = "none";
  document.querySelector("body").style.overflow = "auto";
});

// publishing the post on click:
postBtn.addEventListener("click", (e) => {
  publishPost();
});
