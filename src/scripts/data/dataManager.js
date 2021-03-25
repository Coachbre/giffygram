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
  const userId = getLoggedInUser().id
  return fetch(`http://localhost:8088/posts?_expand=user`)
    .then(response => response.json())
    .then(parsedResponse => {
      console.log("data with user", parsedResponse)
      postCollection = parsedResponse
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


let loggedInUser = {}
  

  //function should log the user OUT
  export const logoutUser = () => {
    loggedInUser = {}
  }


  // sets existing user (userObj) as the logged in user
  export const setLoggedInUser = (userObj) => {
    loggedInUser = userObj;
  }


  // requests user info from the database
  export const loginUser = (userObj) => {
    return fetch(`http://localhost:8088/users?name=${userObj.name}&email=${userObj.email}`)
    // convert response into json
    .then(response => response.json())
    .then(parsedUser => {
      //is there a user?
      console.log("parsedUser", parsedUser) 
      // --data is returned as an array and .length refers to the # of objects
      if (parsedUser.length > 0){
        setLoggedInUser(parsedUser[0]);
        return getLoggedInUser();
      }else {
        //no user
        return false;
      }
    })
  }

//creates and posts new user to the users table/array
  export const registerUser = (userObj) => {
    return fetch(`http://localhost:8088/users`, {
      method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userObj)
    })
    .then(response => response.json())
    // turns response into json (parsedUser)
    .then(parsedUser => {
      // sets parsedUser (response) as logged in user
      setLoggedInUser(parsedUser);
      return getLoggedInUser();
    })
  }


