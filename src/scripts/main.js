// Can you explain what is being imported here?
import { getPosts, getUsers } from "./data/DataManager.js"
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



// posts list
const showPostList = () => {
	//Get a reference to the location on the DOM where the list will display
	const postElement = document.querySelector(".postList");
	getPosts().then((allPosts) => {
		postElement.innerHTML = PostList(allPosts);
	})
}


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
	showPostList();
    showFooter();
}

startGiffyGram();

