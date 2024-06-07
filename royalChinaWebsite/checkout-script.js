//global vars
var orderItem_list; 
var subTotal = 0;
var grandTotal = 0;
var tax = 0.08475; 

function loadList(){
    //grab string array
    var jsonStr = localStorage.getItem('orderItem_list');
    //turn it back to an array
    orderItem_list = JSON.parse(jsonStr);
}

function saveList(){
    //convert to JSON str
    var jsonStr = JSON.stringify(orderItem_list);
    //store 
    localStorage.setItem('orderItem_list', jsonStr);
    alert('Added!');
}

function displayCheckOut(){
    
    //load the list
    loadList();

    if (orderItem_list.length == 0)
        return;


    //where to write to 
    var olEl = document.getElementById('orderSummary-container');

    for (let i=0; i<orderItem_list.length; i++){
        //add to subtotal
        var itemSubTotal = orderItem_list[i].price*orderItem_list[i].quantity;
        subTotal += itemSubTotal;

        var liEl = document.createElement('li');
        liEl.appendChild(document.createTextNode(orderItem_list[i].name));

        //it is a combo order
        if (orderItem_list[i].side != '')
            liEl.appendChild(document.createTextNode(' with ' + orderItem_list[i].side));
      

        liEl.appendChild(document.createTextNode(
            ' . . . . . [' + 
            orderItem_list[i].quantity
        ));

        //size
        if (orderItem_list[i].size){
            liEl.appendChild(document.createTextNode('- ' + orderItem_list[i].size));
        }

        //price
        liEl.appendChild(document.createTextNode(
            'x] $' + orderItem_list[i].price.toFixed(2) + ' = $' + 
            itemSubTotal.toFixed(2)));

        //write to page
        olEl.appendChild(liEl);
    }

    var h4El = document.getElementById('totalCost');
    //get grandTotal
    grandTotal += (subTotal + (subTotal*tax));
    h4El.innerHTML = 'Total: $' + grandTotal.toFixed(2);
}


//main

var payButtonEl = document.getElementById('payButton').addEventListener('click', function(){
    orderItem_list.length = 0;
    saveList();
    alert('Thank you!');
    //redirect to home page
    window.location.href = 'index.html';
},false);


var backButtonEl = document.getElementById('backButton').addEventListener('click', function(){
    window.location.href = 'index.html#categoriesTop';
},false);


//main
displayCheckOut();
