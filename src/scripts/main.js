// Can you explain what is being imported here?
import { getPosts, getUsers } from "./data/DataManager.js"
import { PostList } from "./feed/PostList.js"

const showPostList = () => {
	//Get a reference to the location on the DOM where the list will display
	const postElement = document.querySelector(".postList");
	getPosts().then((allPosts) => {
		postElement.innerHTML = PostList(allPosts);
	})
}


const startGiffyGram = () => {
	showPostList();
}

startGiffyGram();
