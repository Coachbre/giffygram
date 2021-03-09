import { getUsers } from "./datamanager.js"

export const userList = () => {

    // Get a reference to the `<article class="content">` element
    const contentElement = document.querySelector(".userListContainer")
    const UserArray = getUsers();

    let storeUserHtml = "";
    

    for (const singleUser of UserArray) {


        storeUserHtml += Users(singleUser)

    }
 
    contentElement.innerHTML += `
        <section class="UserList">
            ${storeUserHtml}
        </section>
    `
}