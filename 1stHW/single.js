const urlSearchParams = new URLSearchParams(window.location.search);
const postIndex = urlSearchParams.get('index')

const wrapper = document.getElementById('post-wrapper')


const getPosts = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => {
          createPost(json)        
      });
  };
  
const createPost = (post) => {
}