const blogWrapper = document.getElementById("posts-wrapper");

const getPosts = () => {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((json) => {
      json.map((post) => {
        createNewPost(post);
      });
    });
};

const createNewPost = (post) => {
//creating elements:
  const container = document.createElement("div");
  container.classList.add( "post-container")
  const postElements = {
    index: document.createElement("span"),
    title: document.createElement("a"),
    // author: document.createElement('h5'),
    content: document.createElement("p"),
  };

// defining elements content and classes:
  const { index, title, author, content } = postElements;
  index.innerText = post.id;
  title.innerText = post.title;
  // author.innerText =
  content.innerText = post.body.split(' ').slice(0, 5).join(' ') + '...';

  index.classList.add("post-index")
  title.classList.add("post-title")
  content.classList.add("post-content")

  //adding link for viewing post content:
    title.href = `./single-post.html?index=${post.id}`

//inserting elements in the DOM: 
  for (const element in postElements) {      
    container.appendChild(postElements[element]);
    blogWrapper.appendChild(container);
  }
};
