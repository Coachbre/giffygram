// Can you explain what is being imported here?
import { getPosts, getUsers } from "./data/dataManager.js" 
import { createPost, deletePost, getSinglePost, updatePost } from "./data/dataManager.js"
import { PostEntry } from "./feed/PostEntry.js"
import { PostEdit } from "./feed/PostEdit.js"
import { getLoggedInUser} from "./data/dataManager.js"
import { clearForm } from "./feed/PostEntry.js"
import { PostList } from "./feed/PostList.js"
import { NavBar } from "./nav/NavBar.js"
import { Footer } from "./nav/Footer.js"


// *event listener goes here ********
const applicationElement = document.querySelector(".giffygram");
applicationElement.addEventListener("change", event => {
	if (event.target.id === "yearSelection")
    {
		const yearAsNumber = parseInt(event.target.value)
		console.log(`user wants to see posts since ${yearAsNumber}`)
		// invoke a filter function passing the year as an argument
		showFilteredPosts(yearAsNumber);
	}
})

const showFilteredPosts = (year) => {
	//get a copy of the post collection
	const epoch = Date.parse(`01/01/${year}`);
	//filter the data
	const filteredData = usePostCollection().filter(singlePost => {
	  if (singlePost.timestamp >= epoch) {
		return singlePost
	  }
	})
	const postElement = document.querySelector(".postList");
	postElement.innerHTML = PostList(filteredData);
  }



//   add new 'post' to giffygram site using event listeners
  applicationElement.addEventListener("click", event => {
	if (event.target.id === "newPost__cancel") {
		//clear the input fields
		clearForm ();
	}
  })
  
  applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "newPost__submit") {
	//collect the input values into an object to post to the DB
	  const title = document.querySelector("input[name='postTitle']").value
	  const url = document.querySelector("input[name='postURL']").value
	  const description = document.querySelector("textarea[name='postDescription']").value
	  //we have not created a user yet - for now, we will hard code `1`.
	  //we can add the current time as well
	  const postObject = {
		  title: title,
		  imageURL: url,
		  description: description,
		  userId: getLoggedInUser().id,
		  timestamp: Date.now()
	  }
	  clearForm();
	

	// be sure to import from the DataManager
		createPost(postObject)
		.then(response => {
			
			showPostList();
		})
	}


  })

//   post entry function
  const showPostEntry = () => { 
	//Get a reference to the location on the DOM where the nav will display
	const entryElement = document.querySelector(".entryForm");
	entryElement.innerHTML = PostEntry();
  }




// posts list
const showPostList = () => {
	//Get a reference to the location on the DOM where the list will display
	const postElement = document.querySelector(".postList");
	getPosts().then((allPosts) => {
		postElement.innerHTML = PostList(allPosts.reverse());
	})
}

//event listener performs when a string beginning with 'edit' is clicked on
//string method 'split' splits string into array substrings wherever you indicate it to
// then returns the index that you choose
applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id.startsWith("edit")) {
		console.log(event.target.id)
	  const postId = event.target.id.split("__")[1];
	  console.log(postId)
	  getSinglePost(postId)
		.then(response => {
		  showEdit(response); //displays a single post (defined below)
		})
	}
  })

  const showEdit = (postObj) => {
	const entryElement = document.querySelector(".entryForm");
	entryElement.innerHTML = PostEdit(postObj);
  }


  //event listener for when the update button is clicked

  applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id.startsWith("updatePost")) {
	  const postId = event.target.id.split("__")[1];
	  //collect all the details into an object
	  const title = document.querySelector("input[name='postTitle']").value
	  const url = document.querySelector("input[name='postURL']").value
	  const description = document.querySelector("textarea[name='postDescription']").value
	  const timestamp = document.querySelector("input[name='postTime']").value
	  
	  const postObject = {
		title: title,
		imageURL: url,
		description: description,
		userId: getLoggedInUser().id,
		timestamp: parseInt(timestamp),
		id: parseInt(postId)
	  }
	  
	  
	  updatePost(postObject)
		.then(response => {
		  showPostList();
		  showPostEntry();
		})
	}
  })



//delete a post
applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id.startsWith("delete")) {
	  const postId = event.target.id.split("__")[1];
	//   deletePost(postId)
	// 	.then(response => {
	// 	  showPostList();
	// 	})
	console.log(event.target.id)
	}
  })


// Nav bar function
const showNavBar = () => {
    //Get a reference to the location on the DOM where the nav will display
    const navElement = document.querySelector("nav");
	navElement.innerHTML = NavBar();
}


// Footer function
const showFooter = () => {
    //Get a reference to the location on the DOM where the nav will display
    const footerElement = document.querySelector("footer");
	footerElement.innerHTML = Footer();
}

// Runnn
const startGiffyGram = () => {
    showNavBar();
	showPostEntry();
	showPostList();
    showFooter();
}

startGiffyGram();

