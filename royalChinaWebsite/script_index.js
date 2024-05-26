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


var soupName = [
    'Wonton Soup',
    'Egg Drop Soup',
    'Wonton Egg Drop Soup',
    'Hot & Sour Soup'
]

var soupSmallPrice = [
    3.75, 3.25, 3.85, 3.65
]

var soupLargePrice = [
    4.55, 4.25, 4.95, 5.25
]

var friedRiceName = [
    'Plain Fried Rice',
    'Vegetable Fried Rice',
    'Roast Pork Fried Rice',
    'Chicken Fried Rice',
    'Shrimp Fried Rice',
    'Beef Fried Rice',
    'House Special Fried Rice'
]

var friedRiceSmallPrice = [
    5.85, 6.50, 6.95, 6.95, 7.15, 7.15, 7.45
]

var friedRiceLargePrice = [
    7.50, 8.95, 9.50, 9.50, 9.85, 9.85, 10.50
]

//OrderItem object
function OrderItem (name, quantity, price, size, other){
    this.name = name;
    this.quantity = quantity;
    this.price = price;
    this.size = size;
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
        spanEl.textContent = '$' + appetizerPrice[i].toFixed(2);
        spanEl.className = 'largePriceFormat'; // not really large, just same postion
        liEl.appendChild(spanEl);

        //quantity selector
        let inputEl = document.createElement('input');
        inputEl.type = 'number';
        inputEl.id = appetizerName[i] + "Quantity";
        inputEl.placeholder = "Quantity";
        inputEl.className = 'appetizerInputNumber';

        liEl.appendChild(inputEl);

        //the add button
        let buttonEl = document.createElement('button');
        buttonEl.textContent = "ADD";
        buttonEl.className = 'addItemButton';
        buttonEl.addEventListener('click', function() {
            addAppetizer(
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


function loadSoups(){
    //where to write
    var soupContainer = document.getElementById('soups-container');

    for(let i=0; i<soupName.length; i++){
        //item name
        let liEl = document.createElement('li');
        liEl.appendChild(document.createTextNode(soupName[i]));

        //add small item price
        let smallItemPrice = document.createElement('span');
        smallItemPrice.className = 'smallPriceFormat';
        smallItemPrice.innerHTML = 'Small: $' + soupSmallPrice[i];

        //add small item price
        let largeItemPrice = document.createElement('span');
        largeItemPrice.className = 'largePriceFormat';
        largeItemPrice.innerHTML = 'Large: $' + soupLargePrice[i];



        //small quantity
        let quantitySmall = document.createElement('input');
        quantitySmall.type = "number";
        quantitySmall.placeholder = "Quantity";
        quantitySmall.className = "quantitySmallInputNumber";



        //large quantity
        let quantityLarge = document.createElement('input');
        quantityLarge.type = "number";
        quantityLarge.placeholder = "Quantity";
        quantityLarge.className = "quantityLargeInputNumber";


        //add button
        let buttonEl = document.createElement('button');
        buttonEl.textContent = "ADD";
        buttonEl.className = 'addItemButton';
        buttonEl.addEventListener('click', function() {
            addItem(
                soupName[i], soupSmallPrice[i], quantitySmall.value, soupLargePrice[i], quantityLarge.value
            );

            //clear quanity amount
            quantitySmall.value = '';
            quantityLarge.value = '';

        }, false);


        liEl.append(smallItemPrice, quantitySmall, largeItemPrice, quantityLarge, buttonEl);
    
        //write to page
        soupContainer.appendChild(liEl);
    }

}

function load(toWhereID, arrayName, arraySmallPrice, arrayLargePrice){
    //where to write
    var container = document.getElementById(toWhereID);

    for(let i=0; i<arrayName.length; i++){
        //item name
        let liEl = document.createElement('li');
        liEl.appendChild(document.createTextNode(arrayName[i]));

        //add small item price
        let smallItemPrice = document.createElement('span');
        smallItemPrice.className = 'smallPriceFormat';
        smallItemPrice.innerHTML = 'Small: $' + arraySmallPrice[i].toFixed(2);

        //add small item price
        let largeItemPrice = document.createElement('span');
        largeItemPrice.className = 'largePriceFormat';
        largeItemPrice.innerHTML = 'Large: $' + arrayLargePrice[i].toFixed(2);



        //small quantity
        let quantitySmall = document.createElement('input');
        quantitySmall.type = "number";
        quantitySmall.placeholder = "Quantity";
        quantitySmall.className = "quantitySmallInputNumber";



        //large quantity
        let quantityLarge = document.createElement('input');
        quantityLarge.type = "number";
        quantityLarge.placeholder = "Quantity";
        quantityLarge.className = "quantityLargeInputNumber";


        //add button
        let buttonEl = document.createElement('button');
        buttonEl.textContent = "ADD";
        buttonEl.className = 'addItemButton';
        buttonEl.addEventListener('click', function() {
            addItem(
                arrayName[i], arraySmallPrice[i], quantitySmall.value, arrayLargePrice[i], quantityLarge.value
            );

            //clear quanity amount
            quantitySmall.value = '';
            quantityLarge.value = '';

        }, false);


        liEl.append(smallItemPrice, quantitySmall, largeItemPrice, quantityLarge, buttonEl);
    
        //write to page
        container.appendChild(liEl);
    }

}

//add item to the list
function addAppetizer(name, price, quantity, other){
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

    // alert('Adding item!'); //debug
    orderItem_list.push(newOrderItem);

    //save the list
    saveList();
    // alert('adding done');
}


function addItem(name, smallPrice, smallQuantity, largePrice, largeQuantity){
    //no order
    if (!smallQuantity && ! largeQuantity){
        alert('Empty!');
        return;
    }

    var newOrderItem;

    //must figure out if its small, large, or both
    if (smallQuantity){
        newOrderItem = new OrderItem(name, smallQuantity, smallPrice, 'Small');
        orderItem_list.push(newOrderItem);
        saveList();
    }
    if (largeQuantity){// large orders
        newOrderItem = new OrderItem(name, largeQuantity, largePrice, 'Large');
        orderItem_list.push(newOrderItem);
        saveList();
    }
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
// loadSoups();
load('soups-container', soupName, soupSmallPrice, soupLargePrice);
load('friedRice-container', friedRiceName, friedRiceSmallPrice, friedRiceLargePrice);