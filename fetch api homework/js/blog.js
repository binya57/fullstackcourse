// variables holding page elements:
const blogWrapper = document.getElementById("posts-wrapper");
const loader = document.getElementById("loader");
const createBtn = document.getElementById("create-post");
const overlay = document.getElementById("overlay");
const NewPostForm = document.getElementById("new-post-modal");
const postBtn = document.getElementById("publish");
const closeModal = document.getElementById("close-modal");
const returnToTop = document.getElementById("return-to-top");

// variables to hold posts and user info:
let posts, users;

// var for indexing user created posts:
let userPostNum;

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
    [posts, users, userPostNum] = [postsRes, usersRes, postsRes.length];
    posts.map(post => generatePost(post));
    loader.style.display = "none";
  }
    
  );
})();

// post generating function:
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
  content.innerText = shorten(post.body);

  //adding classes to added elements:
  container.classList.add("post-container");
  index.classList.add("post-index");
  title.classList.add("post-title");
  author.classList.add("post-author");
  content.classList.add("post-content");

  //adding link for viewing post content:
  if (!post.new) title.href = `./single-post.html?post=${post.id}`;

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
      newId: ++userPostNum,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      generatePost(json);
    });
  [name.value, title.value, content.value] = [null, null, null];
}

// shortening posts body:
function shorten(str) {
  const noNewLines = str.replace(/\r?\n|\r/, " ");
  const splited = noNewLines.split(" ");
  const sliced = splited.slice(0, 5);
  const shortStr = sliced.join(" ") + "...";
  return shortStr;
}

//  open create post modal:
createBtn.addEventListener("click", (e) => {
  NewPostForm.style.display = "flex";
  overlay.style.display = "block";
  document.querySelector("body").style.overflow = "hidden";
});

// closing modal:
closeModal.addEventListener("click", (e) => {
  NewPostForm.style.display = "none";
  overlay.style.display = "none";
  document.querySelector("body").style.overflow = "auto";
});

// publishing the post on click:
postBtn.addEventListener("click", publishPost);

// showing scroll to top button:
addEventListener("scroll", (e) => {
  const position = scrollY;
  const height = document.body.clientHeight * 0.05;
  if (position < height) {
    returnToTop.style.display = "none";
  }
  if (position > height) {
    returnToTop.style.display = "initial";
  }
});

// scroll to top:
returnToTop.addEventListener("click", (e) => {
  scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});
