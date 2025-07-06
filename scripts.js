
const rambleTitle = document.getElementById("ramble-title")
const rambleContent = document.getElementById("ramble-content")
const titleError = document.getElementById("title-error")
const contentError = document.getElementById("content-error")
const postButton = document.getElementById("post-button")
const rambleTemplate = document.getElementById("ramble-template")
const rambleContainer = document.getElementById("ramble-container")
const editButtons = document.querySelectorAll(".edit-button") // returns NodeList which we'll have to loop through to attach 'click' EventListener
const nvmButtons = document.querySelectorAll(".nvm-button") // returns NodeList which we'll have to loop through to attach 'click' EventListener
let rambleHistory = [] // array of objects (will hold each "ramble" from user); this was not working when i was using const

// retrieves any object/data (as a string) saved in local storage as a result of user previously interacting with app
const saved_data = localStorage.getItem("rambles")

/* if there is saved information, use said information to go through
   our app's functionality once again; functionality re-described for
   saved user info in function "recoverRambles()"*/
if (saved_data) {
  rambleHistory = JSON.parse(saved_data); // convert string data back to array`

  for (let ramble of rambleHistory) {
    recoverRambles(ramble); // will display saved info after re-inputting data into a replicated function called recoverRambles(ramble)
  }
}

/**
 * the following two arrow-functions apply
 * validation for the 2 input fields for
 * any given post:
 * "ramble title" and "ramble content"
 */

rambleTitle.addEventListener("input", () => {
// check input validity and decide validation message based on result

    if(rambleTitle.validity.valueMissing) {
        rambleTitle.setCustomValidity("title cannot be empty")
    } else if(rambleTitle.validity.tooLong) {
        rambleTitle.setCustomValidity("title is too long")
    } else {
        rambleTitle.setCustomValidity("") //clear custom error if valid
    }

    titleError.textContent = rambleTitle.validationMessage

})

rambleContent.addEventListener("input", () => {

    if(rambleContent.validity.valueMissing) {
        rambleContent.setCustomValidity("content cannot be empty")
    } else if(rambleContent.validity.tooLong) {
        rambleContent.setCustomValidity("content is too long")
    } else {
        rambleContent.setCustomValidity("") //clear custom error if valid
    }

    contentError.textContent = rambleContent.validationMessage

})

/**
 * logic for clicking "ramble" button (aka "post" button);
 * checks for validations upon click, validations must pass for post to occur.
 */

postButton.addEventListener('click', (event) => {

    event.preventDefault() // prevents default behavior for submit-button since i want to define that logic here
    console.log("ramble button clicked")

    /**
     * following if-else describes what happens when all validations pass at moment of user's click,
     * and what happens if validations don't pass at moment of user's click.
     */

    if(rambleTitle.validity.valid && rambleContent.validity.valid) {

        /* retrieve user input for new ramble */
        const title = rambleTitle.value
        const content = rambleContent.value

        /**
         * if validations pass, object is created, representing the ramble/post.
         * properties determined based on user's input values
         */
        let ramble = {
            title: title,
            content: content,
            timestamp: new Date().toLocaleString() //
        }

        // ramble object is pushed to "rambleHistory" array
        rambleHistory.push(ramble)

        // save ramble object to local storage (as string)
        localStorage.setItem("rambles", JSON.stringify(rambleHistory));

        /**
        * ************************** CODE BELOW APPLIES FOR DATA RECOVERY ********************************
        */

        /* clone template ramble and make visible */
        const template_clone = rambleTemplate.cloneNode(true)
        template_clone.removeAttribute("id") // identical ids would cause confusion
        template_clone.classList.remove("is-hidden")
        
        /**
         * search inside the child elements of template_clone, and
         * look for classes "template-title" and "template-content",
         * then populate those elements with user's inputs, "title" and "content"
         */
        template_clone.querySelector(".template-title").textContent = title
        template_clone.querySelector(".template-content").textContent = content

        // prepare to add logic to our "nvm" button (aka our "delete post/ramble" button)
        const nvmButton = template_clone.querySelector(".nvm-button")

        nvmButton.addEventListener("click", () => {
            
            //our local storage array of objects will now only include (filter for) objects whose timestamp DON'T match our current ramble object's timestamp value
            rambleHistory = rambleHistory.filter(r => r.timestamp !== ramble.timestamp)
            localStorage.setItem("rambles", JSON.stringify(rambleHistory)) // convert filtered array to string and save in local storage again

            template_clone.remove()
        })

        rambleContainer.appendChild(template_clone)

        /* clear user inputs for ramble-form */
        rambleTitle.value = ""
        rambleContent.value = ""

    } 

})

function recoverRambles(ramble) {

    /* clone template ramble and make visible */
    const template_clone = rambleTemplate.cloneNode(true)
    template_clone.removeAttribute("id") // identical ids would cause confusion
    template_clone.classList.remove("is-hidden")
        
    /**
     * search inside the child elements of template_clone, and
     * look for classes "template-title" and "template-content",
     * then populate those elements with user's inputs, "title" and "content"
     */
    template_clone.querySelector(".template-title").textContent = ramble.title
    template_clone.querySelector(".template-content").textContent = ramble.content

    // prepare to add logic to our "nvm" button (aka our "delete post/ramble" button)
    const nvmButton = template_clone.querySelector(".nvm-button")

    nvmButton.addEventListener("click", () => {
            
        //our local storage array of objects will now only include (filter for) objects whose timestamp DON'T match our current ramble object's timestamp value
        rambleHistory = rambleHistory.filter(r => r.timestamp !== ramble.timestamp)
        localStorage.setItem("rambles", JSON.stringify(rambleHistory)) // convert filtered array to string and save in local storage again

        template_clone.remove()
    })

    rambleContainer.appendChild(template_clone)

}
