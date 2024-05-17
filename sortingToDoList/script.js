var taskList = []; // array that stores all Task

var importance1 = []; // all Task with importance of 1 and so on...
var importance2 = [];
var importance3 = [];
var importance4 = [];
var importance5 = [];


//Task object
function Task(name, monthDue, dateDue, yearDue, importance)
{
    this.name = name;
    this.monthDue = monthDue;
    this.dateDue = dateDue;
    this.yearDue = yearDue;
    this.dueDateStr = monthDue + '/' + dateDue + '/' + yearDue;

    
    let temp = yearDue;


    //appropriate place values
    if (monthDue < 10){
        temp += '0'+ monthDue;
    } else {
        temp += monthDue;
    }
    if (dateDue < 10){
        temp += '0' + dateDue; 
    } else {
        temp += dateDue;
    }
    
    this.dueDateVal = temp;

    this.importance = importance;
}

//add a Task to the arr
function addTask(){
    var taskEl = document.getElementById('taskName');

    var monthEl = document.getElementById('monthDue');
    var dayEl = document.getElementById('dayDue');
    var yearEl = document.getElementById('yearDue');

    var importanceEl = document.getElementById('importance');

    //error checking: do not add task if any field left blank
    if (!taskEl.value || !monthEl.value || !dayEl.value || !yearEl.value || !importanceEl.value){
        alert('Please fill out all fields!');
        return;
    } 

    //create new Task obj
    var newTask = new Task(taskEl.value, monthEl.value, dayEl.value, yearEl.value, importanceEl.value);

    
    //categorize Task by importance
    switch (importanceEl.value){
        case '1':
            importance1.push(newTask);
            // alert('i1: ' + importance1.length);
            save('importance1', importance1);
            break;
        case '2':
            importance2.push(newTask);
            // alert('i2: '+importance2.length);
            save('importance2', importance2);
            break;
        case '3':
            importance3.push(newTask);
            // alert('i3: '+importance3.length);
            save('importance3', importance3);
            break;
        case '4':
            importance4.push(newTask);
            // alert('i4: '+importance4.length);
            save('importance4', importance4);
            break;
        case '5':
            importance5.push(newTask);
            // alert('i5: '+importance5.length);
            save('importance5', importance5);
            break;
        default:
            alert('Error on switch!'); // should not get to this!
            break;
    }

    //add the task to arr
    taskList.push(newTask);
    save('taskList', taskList);

    //clear out the field/reset select
    taskEl.value = ''; 
    monthEl.selectedIndex = 0;
    dayEl.selectedIndex = 0;
    yearEl.selectedIndex = 0;
    importanceEl.selectedIndex = 0;

    printTaskList();
}

//print all Task in arr
function printTaskList(){
    var listContainerEl = document.getElementById('listContainer');
    listContainerEl.innerText = '';

    for (var i=0; i<taskList.length;i++){
        var newTask = document.createElement('li');

        //complete "button"
        let inputEl = document.createElement('input');
        inputEl.type = 'radio';

        newTask.appendChild(inputEl); // add complete button

        newTask.appendChild(document.createTextNode(taskList[i].name)); // add task name

        //create subfield for due date and importance
        var newTaskSubfield = document.createElement('div');
        newTaskSubfield.textContent = '[' + taskList[i].dueDateStr + '] (' + taskList[i].importance + ')';
        newTaskSubfield.id = 'subfield';
        newTask.appendChild(newTaskSubfield); // add subfield 
        
        //delete task button
        let buttonEl = document.createElement('button');
        buttonEl.textContent = 'X'; 
        buttonEl.id = 'del_button';
        buttonEl.addEventListener('click', deleteTask, false); // event to delete a task
        newTaskSubfield.appendChild(buttonEl); // add delete button

        listContainerEl.appendChild(newTask); //write li to ul
    }
}

//clear all Task in arr and on To Do
function clearTask(){
    taskList.length = 0; 
    save('taskList', taskList);

    importance1.length = 0;
    importance2.length = 0;
    importance3.length = 0;
    importance4.length = 0;
    importance5.length = 0;

    save('importance1', importance1);
    save('importance2', importance2);
    save('importance3', importance3);
    save('importance4', importance4);
    save('importance5', importance5);


    var spanEl = document.getElementById('listContainer');
    spanEl.innerText = '';
}


//sort Task by due date (most urgent)
function sortByDate(){
    if (taskList.length < 1){
        alert('No task to sort!');
        return;
    }
    //achieved with counting sort

    //get the max of the input list
    let max = 0;
    for (let i = 0; i < taskList.length; i++){
        max = Math.max(max,taskList[i].dueDateVal);
    }

    //create count array to store the count of each element
    let countArr = new Array(max+1).fill(0);

    //mapping each element of taskList as an inex of countArray
    for (let i=0; i<taskList.length;i++){
        countArr[taskList[i].dueDateVal]++;
    }

    //calculating prefix sum at every index of countArr
    for (let i = 1; i <= max; i++){
        countArr[i] += countArr[i-1];//.dueDateVal;
    }

    //create sortedArr from countArr
    const sortedArr = new Array(taskList.length);
    for (let i = taskList.length-1; i>=0; i--){
        sortedArr[countArr[taskList[i].dueDateVal]-1] = taskList[i];
        countArr[taskList[i].dueDateVal]--;
    }

    taskList = sortedArr;

    printTaskList();
}

//function that prints out a given array
function printArr(arr){
    if (arr.length < 0){
        return;
    } else {
        var ulEl = document.getElementById('listContainer');

        for (let i=0; i < arr.length; i++)
        {
            let liEl = document.createElement('li');

            //complete button
            let inputEl = document.createElement('input');
            inputEl.type = 'radio';
            liEl.appendChild(inputEl); //add complete button

            liEl.appendChild(document.createTextNode(arr[i].name)); //add task name

            //subfield
            let liSubEl = document.createElement('div');
            liSubEl.textContent = '[' + arr[i].dueDateStr + '] (' + arr[i].importance + ')';
            liSubEl.id = 'subfield';

            //delete task button
            buttonEl = document.createElement('button');
            buttonEl.textContent = 'X';
            buttonEl.id = 'del_button';
            buttonEl.addEventListener('click', deleteTask, false); // event to delete a task 

            liSubEl.appendChild(buttonEl);
            liEl.appendChild(liSubEl);
            ulEl.appendChild(liEl);
        }
    }
}

//sort Task by importance
function sortByImportance(){ 
    if (importance1.length+importance2.length+importance3.length+importance4.length+importance5.length < 1){
        alert('No task to sort!');
        return;
    }

    var ulEl = document.getElementById('listContainer');
    ulEl.innerText = '';
    
    //debug
    // alert('i1;'+importance1.length);
    // alert('i2;'+importance2.length);
    // alert('i3;'+importance3.length);
    // alert('i4;'+importance4.length);
    // alert('i5;'+importance5.length);

    printArr(importance5);
    printArr(importance4);
    printArr(importance3);
    printArr(importance2);
    printArr(importance1);
}


//intialize things after webpage loads
window.onload = function() {

    //load saved list
    loadTaskList();
    
    var date = new Date();
    var currMonth = date.getMonth()+1; // Jan = 0
    var currDate = date.getDate();
    var currYear = date.getFullYear();

    //option for month select
    var selectEl = document.getElementById('monthDue');
    for (var i=1; i<=12; i++){
        var option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectEl.appendChild(option);
    }
    //default to current month
    var defaultOption = document.getElementById('defaultMonth');
    defaultOption.value = currMonth;
    defaultOption.textContent = currMonth;

    //option for day select
    selectEl = document.getElementById('dayDue');
    for (var i=1; i<=31; i++){
        var option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectEl.appendChild(option);
    }
    //default to current date
    defaultOption = document.getElementById('defaultDate');
    defaultOption.value = currDate;
    defaultOption.textContent = currDate;

    //option for year select
    selectEl = document.getElementById('yearDue');
    for (var i=2024; i<=2028; i++){
        var option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectEl.appendChild(option);
    }
    //default to current year
    defaultOption = document.getElementById('defaultYear');
    defaultOption.value = currYear;
    defaultOption.textContent = currYear;

    //option for importance select
    selectEl = document.getElementById('importance');
    for (var i=1; i<=5; i++){
        var option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        if (i===5)
            option.textContent += ' (highest)';
        selectEl.appendChild(option);
    }
    //default to lowest importance (1)
    defaultOption = document.getElementById('defaultImportance');
    defaultOption.value = 1;
}

//saves what was specified to local session
function save(saveNameStr, thing2SaveObj){
    const thing2Save_str = JSON.stringify(thing2SaveObj);
    localStorage.setItem(saveNameStr, thing2Save_str);
}

//load the Task 
function loadTaskList(){
    //load the Task arr
    let retrievedArrStr = localStorage.getItem('taskList');
    taskList = JSON.parse(retrievedArrStr) || [];
    printTaskList(); // print the array

    //load the importance arrays
    retrievedArrStr = localStorage.getItem('importance1');
    importance1 = JSON.parse(retrievedArrStr)|| [];

    retrievedArrStr = localStorage.getItem('importance2');
    importance2 = JSON.parse(retrievedArrStr)|| [];

    retrievedArrStr = localStorage.getItem('importance3');
    importance3 = JSON.parse(retrievedArrStr)|| [];

    retrievedArrStr = localStorage.getItem('importance4');
    importance4 = JSON.parse(retrievedArrStr)|| [];

    retrievedArrStr = localStorage.getItem('importance5');
    importance5 = JSON.parse(retrievedArrStr)|| [];
}


function deleteTask(e){
    var targetEl = e.target;
    var divEl = targetEl.parentNode;
    var liEl = divEl.parentNode;
    var ulEl = liEl.parentNode;

    ulEl.removeChild(liEl); // only hids it, still lives in our taskList;

    //EX: test[5/17/2024] (1)X

    let taskName = liEl.textContent.split('['); // [test, 5/17/2024] (1)X]
    
    let dueDate = taskName[1].split(']'); // [5/17/2024, (1)X]

    let importance = dueDate[1].split('('); // [   , 1)X]
    importance = importance[1].split(')'); // [ 1, X]


    //set all values
    taskName = taskName[0];
    dueDate = dueDate[0];
    importance = importance[0];

    //try to find and remove in taskList
    for(let i=0; i<taskList.length; i++){
        if (taskList[i].name === taskName && taskList[i].dueDateStr === dueDate && taskList[i].importance === importance){
            // alert('found!');    
            taskList.splice(i,1);
            save('taskList',taskList);
            break;
        }
    }
    
    // need to delete task from importance arrays as well
    switch (importance)
    {
        case '1':{
            for (let i=0; i<importance1.length; i++){
                if (importance1[i].name === taskName && importance1[i].dueDateStr === dueDate){
                    importance1.splice(i,1);
                    save('importance1',importance1);
                    break;
                }
            }
            break;
        }
        case '2':{
            for (let i=0; i<importance2.length; i++){
                if (importance2[i].name === taskName && importance2[i].dueDateStr === dueDate){
                    importance2.splice(i,1);
                    save('importance2',importance2);
                    break;
                }
            }
            break;
        }
        case '3':{
            for (let i=0; i<importance3.length; i++){
                if (importance3[i].name === taskName && importance3[i].dueDateStr === dueDate){
                    importance3.splice(i,1);
                    save('importance3',importance3);
                    break;
                }
            }
            break;
        }
        case '4':{
            for (let i=0; i<importance4.length; i++){
                if (importance4[i].name === taskName && importance4[i].dueDateStr === dueDate){
                    importance4.splice(i,1);
                    save('importance4',importance4);
                    break;
                }
            }
            break;
        }
        case '5':{
            for (let i=0; i<importance5.length; i++){
                if (importance5[i].name === taskName && importance5[i].dueDateStr === dueDate){
                    importance5.splice(i,1);
                    save('importance5',importance5);
                    break;
                }
            }
            break;
        }
        default: {
            alert('Deleting task from importance: Error on switch!');
            break;
        }
    }
}