//array that holds items added to the cart
let orderItem_list = new Array();

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
var soupSmallPrice = [ 3.75, 3.25, 3.85, 3.65 ]
var soupLargePrice = [ 4.55, 4.25, 4.95, 5.25 ]

var friedRiceName = [
    'Plain Fried Rice',
    'Vegetable Fried Rice',
    'Roast Pork Fried Rice',
    'Chicken Fried Rice',
    'Shrimp Fried Rice',
    'Beef Fried Rice',
    'House Special Fried Rice'
]
var friedRiceSmallPrice = [ 5.85, 6.50, 6.95, 6.95, 7.15, 7.15, 7.45 ]
var friedRiceLargePrice = [ 7.50, 8.95, 9.50, 9.50, 9.85, 9.85, 10.50 ]

var chowMeinName = [
    'Vegetable Chow Mein',
    'Roast Pork Chow Mein',
    'Chicken Chow Mein',
    'Shrimp Chow Mein',
    'Beef Chow Mein',
    'House Special Chow Mein'
]
var chowMeinSmallPrice = [ 6.50, 6.85, 6.85, 7.25, 7.25, 7.45 ]
var chowMeinLargePrice = [ 9.25, 9.55, 9.55, 10.10, 10.10, 10.45 ]

var chopSueyName = [
    'Vegetable Chop Suey',
    'Roast Pork Chop Suey',
    'Chicken Chop Suey',
    'Shrimp Chop Suey',
    'Beef Chop Suey',
    'House Special Chop Suey'
]
var chopSueySmallPrice = [ 6.50, 6.85, 6.85, 7.50, 7.50, 0 ]
var chopSueyLargePrice = [ 9.50, 10.25, 10.25, 11.50, 11.50, 12.55 ]

var loMeinName = [
    'Plain Lo Mein',
    'Vegtable Lo Mein',
    'Roast Pork Lo Mein',
    'Chicken Lo Mein',
    'Shrimp Lo Mein',
    'Beef Lo Mein',
    'House Special Lo Mein'
]
var loMeinSmallPrice = [ 6.50, 6.85, 7.25, 7.25, 7.50, 7.50, 7.75 ]
var loMeinLargePrice = [ 8.95, 9.25, 9.75, 9.75, 10.10, 10.10, 10.75 ]

var beefName = [
    'Pepper Steak With Onion',
    'Beef With Broccoli',
    'Beef With Mushroom',
    'Sha Cha Beef',
    'Beef With Snow Peas',
    'Beef With Mix Vegetable',
    'Beijing Beef',
    'Black Pepper Steak',
    'Hot & Spicy Shredded Beef',
    'Mongolian Beef',
    'Hunan Beef',
    'Szechuan Beef',
    'Beef With Garlic Sauce',
    'Orange Beef',
    'Kung Pao Beef'
]
var beefSmallPrice = [ 7.65, 7.65, 7.65, 7.65, 7.75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var beefLargePrice = [ 10.95, 10.95, 10.95, 10.95, 11.15, 11.50, 11.85, 11.85, 11.85, 11.85, 11.85, 11.85, 11.85, 11.95, 11.95]

var chowMeiFunName = [
    'Roast Pork Chow Mei Fun',
    'Chicken Chow Mei Fun',
    'Shrimp Chow Mei Fun',
    'Beef Chow Mei Fun',
    'Singapore Style Chow Mei Fun',
    'House Special Chow Mei Fun'
]
var chowMeiFunSmallPrice = [ 0, 0, 0, 0, 0 , 0 ]
var chowMeiFunLargePrice = [ 10.25, 10.25, 10.95, 10.95, 11.65, 11.65 ]

var chickenName = [
    'Honey Chicken',
    'Moo Goo Gai Pan',
    'Chicken With Broccoli',
    'Chicken With Green Pepper',
    'Curry Chicken',
    'Kung Pao Chicken',
    'Chicken With Cashew Nuts',
    'Chicken With Snow Peas',
    'Hot Braised Chicken',
    'Chicken With Mix Vegetable',
    'Chicken With Mushroom',
    'Bourbon Chicken',
    'Sesame Chicken',
    'General Chicken',
    'Lemon Chicken',
    'Chicken With Garlic Sauce',
    'Mongolian Chicken',
    'Hunan Chicken',
    'Szechuan Chicken',
    'Orange Chicken',
    'Black Pepper Chicken', 
    'Pineapple Chicken'
]
var chickenSmallPrice = [ 7.50, 7.50, 7.50, 7.50, 0, 0, 0, 7.65, 7.50, 0, 7.50, 0 , 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var chickenLargePrice = [ 10.50, 10.50, 10.50, 10.50, 10.95, 10.95, 10.95, 10.85, 10.50, 11.45, 10.50, 11.85, 11.65, 11.65, 11.35, 11.75, 11.75, 11.75, 11.85, 11.65, 11.50, 11.50 ]

var shrimpName = [
    'Shrimp With Lobster Sauce (Soup)',
    'Shrimp With Broccoli',
    'Shrimp With Chinese Vegetable',
    'Shrimp With Black Bean Sauce',
    'Shrimp With Snow Peas',
    'Baby Shrimp With Cashew Nuts',
    'Shrimp With Mix Vegetable',
    'Walnut Shrimp',
    'Shrimp With Garlic Sauce',
    'Hot & Spicy Shrimp',
    'Szechuan Shrimp',
    "General Tso's Shrimp"
]
var shrimpSmallPrice = [ 7.85, 7.85, 7.85, 7.85, 7.95, 7.95, 0, 0, 0, 0, 0, 0 ]
var shrimpLargePrice = [ 11.50, 11.50, 11.50, 11.50, 11.75, 11.75, 12.25, 11.95, 12.50, 12.50, 12.50, 11.95]

var eggFooYoungName = [
    'Vegtable Egg Foo Young',
    'Roast Pork Egg Foo Young',
    'Chicken Egg Foo Young',
    'Shrimp Egg Foo Young',
    'Beef Egg Foo Young',
    'House Special Egg Foo Young'
]
var eggFooYoungSmallPrice = [ 0, 0, 0, 0, 0, 0 ]
var eggFooYoungLargePrice = [ 9.95, 9.95, 9.95, 10.50, 10.50, 10.95 ]

var vegetableDishesName = [
    'Mixed Vegetable',
    'Broccoli Garlic Sauce',
    'Sauteed Broccoli'
]
var vegetableDishesSmallPrice = [ 0, 0, 0 ]
var vegetableDishesLargePrice = [ 9.85, 9.85, 9.85 ]

var stPaulSandwichName = [
    'Roast Pork St. Paul Sandwich',
    'Chicken St. Paul Sandwich',
    'Shrimp St. Paul Sandwich',
    'Beef St. Paul Sandwich',
    'House Special St. Paul Sandwich'
]
var stPaulSandwichPrice = [ 6.35, 6.35, 6.50, 6.50, 6.75]

var sideOrdersName = [
    'White Rice',
    'Fortune Cookie',
    "General Tso's Sauce",
    'Brown Gravy',
    'Red Sweet & Sour Sauce'
]
var sideOrdersSmallPrice = [ 3.75, 0, 0, 0, 0 ]
var sideOrdersLargePrice = [ 4.55, 1.50, 1.50, 1.50, 0.50 ]
var sideOrdersQuantity = [ '', '(x10)', '', '', '' ]


var chefSpecialtiesName = [
    'Happy Family',
    'Seafood Delight',
    'Dragon Meets Phoenix',
    'Four Season',
    'Triple Hunan',
    'Hunan Pork',
    'Szechuan Pork'
]
var chefSpecialtiesSmallPrice = [0,0,0,0,0,0,0]
var chefSpecialtiesLargePrice = [14.50, 14.50, 14.50, 13.65, 12.25, 11.75, 11.85]

var combinationDishName = [
    'Chicken Chow Mein',
    'Shrimp Chow Mein',
    'Roast Pork Egg Foo Young',
    'Roast Pork With Chinese Vegetable',
    'Roast Pork Lo Mein',
    'Chicken Lo Mein',
    'Chicken With Broccoli',
    'Moo Goo Gai Pan',
    'Shrimp With Broccoli',
    'Beef With Broccoli',
    'Pepper Steak',
    'Sweet & Sour Chicken',
    'Sweet & Sour Pork',
    'Hunan Chicken',
    'General Chicken',
    'Chicken With Garlic Sauce',
    'Beef With Garlic Sauce',
    'Kung Pao Chicken',
    'Mongolian Beef',
    'Sesame Chicken',
    'Beef Hunan Style',
    'Chicken With Cashew Nuts',
    'Mixed Vegetable',
    'Hot Braised Chicken',
    'Black Pepper Steak',
    'Boneless Rib',
    'Szechuan Chicken',
    'Szechuan Beef',
    'Honey Chicken',
    'Orange Chicken',
    'Chicken on a Stick',
    'Bourbon Chicken',
    'Chicken With Mushroom',
    'Beef With Mushroom',
    'Chicken With Mix Vegetable',
    'Beef With Mix Vegetable',
    'Shrimp With Garlic Sauce',
    'Szechuan Shrimp',
    'Beijing Beef',
    'Pineappple Chicken',
    'Black Pepper Chicken'
]

var lunchSpecialName = [
    'Chicken Chow Mein',
    'Shrimp Chow Mein',
    'Moo Goo Gai Pan',
    'Chicken With Broccoli',
    'Sweet & Sour Chicken',
    'Sweet & Sour Pork',
    'Chicken With Garlic Sauce',
    'Beef With Garlic Sauce',
    'Hunan Chicken',
    'Kung Pao Chicken',
    'Chicken With Cashew Nuts',
    'Pepper Chicken',
    "General Tso's Chicken",
    'Sesame Chicken',
    'Beef With Broccoli',
    'Pepper Steak',
    'Mongolian Beef',
    'Mongolian Chicken',
    'Shrimp With Broccoli',
    'Black Pepper Steak',
    'Shrimp With Garlic Sauce',
    'Mixed Vegetable',
    'Broccoli With Garlic Sauce',
    'Orange Chicken',
    'Hot Braised Chicken',
    'Hot Braised Pork',
    'Szechuan Beef',
    'Roast Pork With Broccoli',
    'Mushroom Chicken',
    'Mushroom Beef',
    'Chicken Lo Mein',
    'Roast Pork Lo Mein',
    'Chicken With Mix Vegetable',
    'Beef With Mix Vegetable'
]


//OrderItem object
function OrderItem (name, quantity, price, size = '', side = ''){
    this.name = name;
    this.quantity = quantity;
    this.price = price;
    this.size = size;
    this.side = side;
}


function loadCombo_Lunch(isCombo){
    //where to print
    var containerEl;

    if (isCombo){
        containerEl = document.getElementById('combinationDishes-container');
        for (let i=0; i<combinationDishName.length; i++){
            //item name
            let liEl = document.createElement('li');
            liEl.appendChild(document.createTextNode(combinationDishName[i]));
    
            //item price
            let price = document.createElement('span');
            price.textContent = '$9.95';
            price.className = 'smallPriceFormat'; // not really large, just same postion
            liEl.appendChild(price);
    
            //quantity selector
            let quantity = document.createElement('input');
            quantity.type = 'number';
            quantity.placeholder = "Quantity";
            quantity.className = "quantitySmallInputNumber";
    
            liEl.appendChild(quantity);
    
            
            //side choices
            let selectEl = document.createElement('select');
            selectEl.className = "sideSelect";
            let defaultOption = document.createElement('option');
            defaultOption.textContent = "Chose a side";
            defaultOption.value = 'null';
    
            let option1 = document.createElement('option');
            option1.textContent = "Crab Rangoon (x3)";
            option1.value = "Crab Rangoon";
    
            let option2 = document.createElement('option');
            option2.textContent = "Egg Roll (x1)";
            option2.value = "Egg Roll";
    
            selectEl.append(defaultOption,option1,option2);
            liEl.appendChild(selectEl);
    
    
            //the add button
            let buttonEl = document.createElement('button');
            buttonEl.textContent = "ADD";
            buttonEl.className = 'addItemButton';
            buttonEl.addEventListener('click', function() {
                if (quantity.value <= 0){
                    alert("Please enter a quantity!");
                    return;
                }
                if (selectEl.value === 'null') {
                    alert("Please choose a side!")
                    return;
                }
    
                //reset back to default option
                alert(selectEl.value);
                alert('adding');
                addCombinationDish(combinationDishName[i]  + " Combination Dish", 9.95, quantity.value, selectEl.value);
                
                selectEl.selectedIndex = 0;
    
            }, false);
    
            liEl.appendChild(buttonEl);
    
    
            containerEl.appendChild(liEl);
        } //end of for loop

    }//end of if 
    else {
    containerEl = document.getElementById('lunchSpecial-container');
        for (let i=0; i<lunchSpecialName.length; i++){
            //item name
            let liEl = document.createElement('li');
            liEl.appendChild(document.createTextNode(lunchSpecialName[i]));

            //item price
            let price = document.createElement('span');
            price.textContent = '$7.95';
            price.className = 'smallPriceFormat'; // not really large, just same postion
            liEl.appendChild(price);

            //quantity selector
            let quantity = document.createElement('input');
            quantity.type = 'number';
            quantity.placeholder = "Quantity";
            quantity.className = "quantitySmallInputNumber";

            liEl.appendChild(quantity);

            
            //side choices
            let selectEl = document.createElement('select');
            selectEl.className = "sideSelect";
            let defaultOption = document.createElement('option');
            defaultOption.textContent = "Chose a side";
            defaultOption.value = 'null';

            let option1 = document.createElement('option');
            option1.textContent = "Crab Rangoon (x2)";
            option1.value = "Crab Rangoon";

            let option2 = document.createElement('option');
            option2.textContent = "Egg Roll (x1)";
            option2.value = "Egg Roll";

            selectEl.append(defaultOption,option1,option2);
            liEl.appendChild(selectEl);


            //the add button
            let buttonEl = document.createElement('button');
            buttonEl.textContent = "ADD";
            buttonEl.className = 'addItemButton';
            buttonEl.addEventListener('click', function() {
                if (!lunchTime()){
                    alert('Lunch is Monday to Friday from 10 AM - 3 PM!');
                    return false;
                }
                if (quantity.value <= 0){
                    alert("Please enter a quantity!");
                    return;
                }
                if (selectEl.value === 'null') {
                    alert("Please choose a side!")
                    return;
                }

                //reset back to default option
                alert(selectEl.value);
                alert('adding');
                addCombinationDish(lunchSpecialName[i] + ' Lunch Special', 7.95, quantity.value, selectEl.value);
                
                selectEl.selectedIndex = 0;

            }, false);

            liEl.appendChild(buttonEl);


            containerEl.appendChild(liEl);
        } //end of for loop
    }// end of else statement

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
            if (inputEl.value > 0) {
                addAppetizer(appetizerName[i], appetizerPrice[i], inputEl.value);
                //clear quanity amount
                inputEl.value = '';
            } else {
                alert ('Please select amount!');
            }
        }, false);

        liEl.appendChild(buttonEl);


        //write to webpage
        appetizerContainerEl.appendChild(liEl);
    }
}

function load(toWhereID, arrayName, arraySmallPrice, arrayLargePrice, arrayQuantity){
    //where to write
    var container = document.getElementById(toWhereID);

    for(let i=0; i<arrayName.length; i++){
        //item name
        let liEl = document.createElement('li');
        liEl.appendChild(document.createTextNode(arrayName[i]));
        
        if (arrayName[i] === 'Fortune Cookie'){
            liEl.appendChild(document.createTextNode(' ' + arrayQuantity[i]));
        }

        if (!arrayName[i].includes('St. Paul Sandwich')) {

            //add small item price
            let quantitySmall;
            if (arraySmallPrice[i]!=0){
                let smallItemPrice = document.createElement('span');
                smallItemPrice.className = 'smallPriceFormat';
                smallItemPrice.innerHTML = 'Small: $' + arraySmallPrice[i].toFixed(2);
                

                //small quantity
                quantitySmall = document.createElement('input');
                quantitySmall.type = "number";
                quantitySmall.placeholder = "Quantity";
                quantitySmall.className = "quantitySmallInputNumber";

                liEl.append(smallItemPrice, quantitySmall);
            }else {
                quantitySmall = false;
            }


            //add large item price
            let largeItemPrice = document.createElement('span');
            largeItemPrice.className = 'largePriceFormat';

            //large quantity
            if (arrayQuantity && arrayName[i] != 'White Rice'){
                largeItemPrice.innerHTML = '$' + arrayLargePrice[i].toFixed(2);
            }
            else{
                largeItemPrice.innerHTML = 'Large: $' + arrayLargePrice[i].toFixed(2);
            }

            let quantityLarge = document.createElement('input');
            quantityLarge.type = "number";
            quantityLarge.placeholder = "Quantity";
            quantityLarge.className = "quantityLargeInputNumber";
            liEl.appendChild(quantityLarge);
            

            //add button
            let buttonEl = document.createElement('button');
            buttonEl.textContent = "ADD";
            buttonEl.className = 'addItemButton';

            buttonEl.addEventListener('click', function() {
                if (quantitySmall.value > 0 || quantityLarge.value > 0) {
                    addItem (arrayName[i], arraySmallPrice[i], quantitySmall.value, arrayLargePrice[i], quantityLarge.value);
                    //clear quanity amount
                    quantitySmall.value = '';
                    quantityLarge.value = '';
                } else {
                    alert ('Please select amount!');
                }

            }, false);


            liEl.append(largeItemPrice, quantityLarge, buttonEl);
        } else { //St. Paul Sandwich does not have a size

            let price = document.createElement('span');
            price.className = 'largePriceFormat';
            price.innerHTML = '$' + arraySmallPrice[i].toFixed(2);

            let quantity = document.createElement('input');
            quantity.type = "number";
            quantity.placeholder = "Quantity";
            quantity.className = "quantityLargeInputNumber";

            //add button
            let buttonEl = document.createElement('button');
            buttonEl.textContent = "ADD";
            buttonEl.className = 'addItemButton';
            buttonEl.addEventListener('click', function() {
                addItem(
                    arrayName[i], arraySmallPrice[i], quantity.value
                );

                //clear quanity amount
                quantity.value = '';

            }, false);


            liEl.append(price, quantity, buttonEl);

        }
    
        //write to page
        container.appendChild(liEl);
    }

}

//add item to the list
function addAppetizer(name, price, quantity, size = '', side = ''){

    if (!quantity){  // error handling
        alert ('Please select a quantity!');
        return;
    } 

    var newOrderItem = new OrderItem(name, quantity, price, size, side);

    // alert('Adding item!'); //debug
    orderItem_list.push(newOrderItem);

    //save the list
    saveList();
}


function addItem(name, smallPrice, smallQuantity, largePrice, largeQuantity){

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

function addCombinationDish(comboName, comboPrice, comboQuantity, comboSide)
{
    var orderItem = new OrderItem(comboName, comboQuantity, comboPrice, '', comboSide);
    orderItem_list.push(orderItem);
    saveList();
}


function saveList(){
    //1) convert to string
    var jsonStr = JSON.stringify(orderItem_list);
    //2) save it!
    localStorage.setItem('orderItem_list', jsonStr);
    alert('saved!');
}

function loadList(){
    // alert('grabbing...');
    //grab string array
    var jsonStr = localStorage.getItem('orderItem_list');
    //turn it back to an array
    orderItem_list = JSON.parse(jsonStr);
    // alert(orderItem_list.length);
}

function populateMenu(){
    // populate the menu items
    loadAppetizers();
    load('soups-container', soupName, soupSmallPrice, soupLargePrice);
    load('friedRice-container', friedRiceName, friedRiceSmallPrice, friedRiceLargePrice);
    load('chowMein-container', chowMeinName, chowMeinSmallPrice, chowMeinLargePrice);
    load('chopSuey-container', chopSueyName, chopSueySmallPrice, chopSueyLargePrice);
    load('loMein-container', loMeinName, loMeinSmallPrice, loMeinLargePrice);
    load('beef-container', beefName, beefSmallPrice, beefLargePrice);
    load('chowMeiFun-container', chowMeiFunName, chowMeiFunSmallPrice, chowMeiFunLargePrice);
    load('chicken-container', chickenName, chickenSmallPrice, chickenLargePrice);
    load('shrimp-container', shrimpName, shrimpSmallPrice, shrimpLargePrice);
    load('eggFooYoung-container', eggFooYoungName, eggFooYoungSmallPrice, eggFooYoungLargePrice);
    load('vegetableDishes-container', vegetableDishesName, vegetableDishesSmallPrice, vegetableDishesLargePrice);
    load('stPaulSandwich-container', stPaulSandwichName, stPaulSandwichPrice);
    load('sideOrders-container', sideOrdersName, sideOrdersSmallPrice, sideOrdersLargePrice, sideOrdersQuantity);
    load('chefSpecialties-container', chefSpecialtiesName, chefSpecialtiesSmallPrice, chefSpecialtiesLargePrice);
    loadCombo_Lunch(true);
    loadCombo_Lunch(false); //load lunch special
}


function lunchTime()
{
    var time = new Date();
    var currTime = time.getHours();
    if (currTime > 12)
        currTime -= 12; 
    if (time.getDay() > 5)
        return false;
    else if (currTime > 3 )
        return false;
    else
        return true;
}


// main

//intialize the shopping cart
window.scrollTo(0, 0);
loadList(); 
populateMenu();
