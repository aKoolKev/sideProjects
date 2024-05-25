window.onload = function() {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
}

//array that holds items added to the cart
orderItem_list = new Array();

//holds name of all appetizers
var appetizerName = [
    'Spring Rolls',
    'Roast Pork Egg Roll',
    'Chicken on a Stick',
    'Fried Dumpling',
    'Steamed Dumpling',
    'Crab Rangoon',
    'Crab Rangoon',
    'Boneless Spare Ribs',
    'Chicken Nuggets',
    'Sugar Biscuit',
    'Fried Wonton',
    'Fried Baby Shrimp',
    'Mozarella Cheese Stick',
    'Crab Stick'
]

var appetizerAmount = [
    '(x2)', 
    '(x1)', 
    '(x6)', 
    '(x8)', 
    '(x8)', 
    '(x5)', 
    '(x10)', 
    '', 
    '(x8)',
    '(x10)',
    '(x10)',
    '(x13)',
    '(x6)',
    '(x5)'
]

var appetizerPrice = [
    1.65,
    1.65,
    8.95,
    7.50,
    7.50, 
    5.50,
    8.10,
    10.50,
    5.45,
    5.85,
    5.85,
    7.50,
    5.45,
    7.50
]

//OrderItem object
function OrderItem (name, quantity, price, other){
    this.name = name;
    this.quantity = quantity;
    this.price = price;
    this.other = other;
}


//loads appetizer to the webpage
function loadAppetizers(){
    //where to print
    var appetizerContainerEl = document.getElementById('appetizers-container');

    for (let i=0; i<appetizerName.length; i++)
    {
        //item name
        let liEl = document.createElement('li');

        if (appetizerName[i] != 'Boneless Spare Ribs')
            liEl.appendChild(document.createTextNode(appetizerName[i] + ' - ' + appetizerAmount[i]));
        else // boneless spare ribs does not have an amount
            liEl.appendChild(document.createTextNode(appetizerName[i]));


        //item price
        let spanEl = document.createElement('span');
        spanEl.textContent = ' $' + appetizerPrice[i].toFixed(2);
        liEl.appendChild(spanEl);

        //quantity selector
        let inputEl = document.createElement('input');
        inputEl.type = 'number';
        inputEl.id = appetizerName[i] + "Quantity";
        inputEl.placeholder = "Quantity";

        liEl.appendChild(inputEl);

        //the add button
        let buttonEl = document.createElement('button');
        buttonEl.textContent = "ADD";
        buttonEl.className = 'addItemButton';
        buttonEl.addEventListener('click', function() {
            addItem(
                appetizerName[i], appetizerPrice[i], inputEl.value
            );

            //clear quanity amount
            inputEl.value = '';

        }, false);

        liEl.appendChild(buttonEl);


        //write to webpage
        appetizerContainerEl.appendChild(liEl);
    }
}



//global vars:
var grandTotal = 0;
var subTotal = 0;
var tax = 0.08475; 


//add item to the list
function addItem(name, price, quantity, other){
    if (!quantity){  // error handling
        alert ('Missing either name, price, or quantity');
        return;
    } 

    var newOrderItem;

    if (!other){ // no other
        newOrderItem = new OrderItem(name, quantity, price);
    }
    else{ // has other
        newOrderItem = new OrderItem(name, quantity, price, other)
    }

    alert('Adding item!'); //debug
    orderItem_list.push(newOrderItem);

    //save the list
    saveList();
    alert('adding done');
}



function saveList(){
    //1) convert to string
    var jsonStr = JSON.stringify(orderItem_list);
    //2) save it!
    localStorage.setItem('orderItem_list', jsonStr);
    alert('saved!');
}




// main
loadAppetizers();