import { getLoggedInUser, getLikes } from "../data/DataManager.js"

export const Post = (postObject) => {
    return `
      <section class="post">

        <header>
            <h2 class="post__title">${postObject.title}</h2>
        </header>
        <img class="post__image" src="${postObject.imageURL}" alt="${postObject.description}"/>
        <button id="like__${postObject.id}">Like</button>
        <p id="likes__${postObject.id}">👍 ${getNumberOfLikes(postObject.id)}</p>
        <button id="edit__${postObject.id}">Edit</button>
        <button id="delete__${postObject.id}">Delete</button>
        

      </section>
    `
  }

  const getNumberOfLikes = (postId) => {
    getLikes(postId)
    .then(response => {
      document.querySelector(`#likes__${postId}`).innerHTML = `👍 ${response.length}`;
    })
  }