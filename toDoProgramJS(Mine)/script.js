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
        alert("You must write something!");
    }
    else{
        //grab select value (importance)
        const selectElement = document.getElementById("importance");

        //grab due date
        const dateElement = document.getElementById("dueDate");

        //add task name to the list
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        //add task subfield description
        let subfield = document.createElement("p");
        subfield.innerHTML = selectElement.value + dateElement.value; // add importance
        li.appendChild(subfield);

        
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

//displays the current date
function getTodayDate(){
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth()+1; // Jan = 0
    const year = date.getFullYear()-2000; // only the 2 right most digits
    const todayDate = document.getElementById("todayDate");
    todayDate.innerHTML += `[${month}-${day}-${year}]`;
}


// Add an event listener to the <select> element to capture changes
document.getElementById('importance').addEventListener('click', function() {
// Get the selected value from the <select> element 
var selectedValue = this.value;

// Save the selected value to sessionStorage (or any other storage method)
sessionStorage.setItem('selectedOption', selectedValue);

// Optionally, provide feedback to the user or perform further actions
// console.log('Option saved: ' + selectedValue);
// alert('Option saved: ' + selectedValue);
},false);


// MAIN
loadData();
getTodayDate();