export const getUsers = () => {

    return fetch("http://localhost:8088/users")
    .then(response => response.json())
    .then(parsedResponse => {
        // do something with response here
console.log("parsedResponse", parsedResponse)
        return parsedResponse;
    })
}


// post entry form
export const createPost = postObj => {
  return fetch("http://localhost:8088/posts", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(postObj)

  })
      .then(response => response.json())

      
}


// filter posts
let postCollection = [];

export const usePostCollection = () => {
  //Best practice: we don't want to alter the original state, so
  //make a copy of it and then return it
  //The spread operator makes this quick work
  return [...postCollection];
}





// shows posts on main.js
export const getPosts = () => {

    return fetch("http://localhost:8088/posts")
    .then(response => response.json())
    .then(parsedResponse => {
        // do something with response here
        return parsedResponse;
    })
}

export const getLoggedInUser = () => {
	return {...loggedInUser};
}

//delete posts

export const deletePost = postId => {
    return fetch(`http://localhost:8088/posts/${postId}`, {
        method: "DELETE"
        // headers: {
        //     "Content-Type": "application/json"
        // }
  
    })
        // .then(response => response.json())
        .then(getPosts)
  }

  //retrieves a single post (ensures we have up to date info from the database)
  // in regards to edit
  export const getSinglePost = (postId) => {
    return fetch(`http://localhost:8088/posts/${postId}`)
      .then(response => response.json())
  }

  //updates post in the database- doesnt create new item, but replaces data
  // that has matching ID of the users selection
  export const updatePost = postObj => {
    return fetch(`http://localhost:8088/posts/${postObj.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postObj)
  
    })
        .then(response => response.json())
        .then(getPosts)
  }


  //function should log the user OUT
let loggedInUser = {}
  
  export const logoutUser = () => {
    loggedInUser = {}
  }

//previous user (from session storage) should stay logged in
  const checkForUser = () => {
    if (sessionStorage.getItem("user")){

        setLoggedInUser(JSON.parse(sessionStorage.getItem("user")));
      startGiffyGram();

    }else {
      //show login/register
      console.log("showLogin")
    }
  }
  checkForUser()

  // sets user
  export const setLoggedInUser (userObj) => {
    loggedInUser = userObj;
  }