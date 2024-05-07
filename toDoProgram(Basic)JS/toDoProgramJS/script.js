const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const submitButton = document.getElementById("submit-button");

//function to handle key press event
function handleKeyPress(event) {
    //check if the pressed key is Enter (key code 13)
    if (event.keyCode === 13) {
        //trigger a click on the submit button
        submitButton.click();
    }
}

//when "add" button is clicked
function addTask(){
    // user attempts to submit an empty task
    if(inputBox.value === ''){
        alert("You must enter a task!");
    }
    else{
        //add task to the list
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        //add option to delete task
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // adds a "cross" icon
        li.appendChild(span);
    }

    //clear value in the input box
    inputBox.value = "";

    //save task to browser
    saveData();
}


//when user hits "enter" in the input box
inputBox.addEventListener("keypress", handleKeyPress);

//either checking a task or deleting a task
listContainer.addEventListener("click", function(e){
    if (e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName == "SPAN"){
        e.target.parentElement.remove(); //span (child), li (parent)
        saveData();
    }
},false);

//save added task to browser
function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}
//load saved data from browser to our list
function loadData(){
    listContainer.innerHTML = localStorage.getItem("data");
}

// MAIN
loadData();