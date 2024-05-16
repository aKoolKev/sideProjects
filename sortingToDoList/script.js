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

    //display task
    var spanEl = document.getElementById('listContainer');
    var liEl = document.createElement('li');
    liEl.textContent = newTask.name + ' ' + newTask.dueDateStr + ' (' + newTask.importance + ')';
    spanEl.appendChild(liEl);


    //categorize Task by importance
    switch (importanceEl.value){
        case '1':
            importance1.push(newTask);
            alert('i1: ' + importance1.length);
            save('importance1', importance1);
            break;
        case '2':
            importance2.push(newTask);
            alert('i2: '+importance2.length);
            save('importance2', importance2);
            break;
        case '3':
            importance3.push(newTask);
            alert('i3: '+importance3.length);
            save('importance3', importance3);
            break;
        case '4':
            importance4.push(newTask);
            alert('i4: '+importance4.length);
            save('importance4', importance4);
            break;
        case '5':
            importance5.push(newTask);
            alert('i5: '+importance5.length);
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
}

//print all Task in arr
function print_taskList(){
    var spanEl = document.getElementById('listContainer');
    spanEl.innerText = '';

    for (var i=0; i<taskList.length;i++){
        var newTask = document.createElement('li');
        newTask.textContent = taskList[i].name + ' ' + taskList[i].dueDateStr + ' (' + taskList[i].importance + ')';
        spanEl.appendChild(newTask);
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

    print_taskList();
}

//sort Task by importance
function sortByImportance(){
    alert('sortByImportance');
    
    var ulEl = document.getElementById('listContainer');
    ulEl.innerText = '';
    
    //debug
    // alert('i1;'+importance1.length);
    // alert('i2;'+importance2.length);
    // alert('i3;'+importance3.length);
    // alert('i4;'+importance4.length);
    // alert('i5;'+importance5.length);


    if (importance5.length > 0){
        for (var i=0;i<importance5.length;i++){
            let liEl = document.createElement('li');
            liEl.textContent = importance5[i].name + ' ' + importance5[i].dueDateStr + ' (' + importance5[i].importance + ')';
            ulEl.appendChild(liEl);
        }
    }

    if (importance4.length > 0){
        for (var i=0;i<importance4.length;i++){
            let liEl = document.createElement('li');
            liEl.textContent = importance4[i].name + ' ' + importance4[i].dueDateStr + ' (' + importance4[i].importance + ')';
            ulEl.appendChild(liEl);
        }
    }

    if (importance3.length > 0){
        for (var i=0;i<importance3.length;i++){
            let liEl = document.createElement('li');
            liEl.textContent = importance3[i].name + ' ' + importance3[i].dueDateStr + ' (' + importance3[i].importance + ')';
            ulEl.appendChild(liEl);
        }
    }

    if (importance2.length > 0){
        for (var i=0;i<importance2.length;i++){
            let liEl = document.createElement('li');
            liEl.textContent = importance2[i].name + ' ' + importance2[i].dueDateStr + ' (' + importance2[i].importance + ')';
            ulEl.appendChild(liEl);
        }
    }

    if (importance1.length > 0){
        for (var i=0;i<importance1.length;i++){
            var liEl = document.createElement('li');
            liEl.textContent = importance1[i].name + ' ' + importance1[i].dueDateStr + ' (' + importance1[i].importance + ')';
            ulEl.appendChild(liEl);
        }
    }

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

function saveTaskList(){
    let storeArrStr = JSON.stringify(taskList);
    localStorage.setItem('taskList', storeArrStr);

    storeArrStr = JSON.stringify(importance1);
    localStorage.setItem('importance1', storeArrStr);

    storeArrStr = JSON.stringify(importance2);
    localStorage.setItem('importance2', storeArrStr);

    storeArrStr = JSON.stringify(importance3);
    localStorage.setItem('importance3', storeArrStr);

    storeArrStr = JSON.stringify(importance4);
    localStorage.setItem('importance4', storeArrStr);

    storeArrStr = JSON.stringify(importance5);
    localStorage.setItem('importance5', storeArrStr);
}

function save(saveName, thing2Save ){
    const thing2Save_str = JSON.stringify(thing2Save);
    localStorage.setItem(saveName, thing2Save_str);
}

function loadTaskList(){
    //load the Task arr
    let retrievedArrStr = localStorage.getItem('taskList');
    taskList = JSON.parse(retrievedArrStr) || [];
    print_taskList(); // print the array

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