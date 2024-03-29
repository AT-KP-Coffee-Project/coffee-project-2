"use strict"

// coffee array
// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

// converts coffee data for html
function renderCoffee(coffee) {
    var html = '<div class="coffee">';
    html += '<h1>' + coffee.name + '</h1>';
    html += '<p>' + coffee.roast + '</p>';
    html += '</div>';

    return html;
}

// converts above into html readable strings
function renderCoffees(coffees) {
    var html = '';
    for(var i = 0 ; i < coffees.length; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

// exports data into DIV of HTML
var coffeeDiv = document.querySelector('#coffees');
coffeeDiv.innerHTML = renderCoffees(coffees)


// update coffee list
function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    var selectedRoast = roastSelection.value;
    var filteredCoffees = [];
    coffees.forEach(function(coffee) {
        if (coffee.roast === selectedRoast) {
            filteredCoffees.push(coffee);
        }
        else if (selectedRoast === 'all'){
            filteredCoffees.push(coffee);
        }
    });
    coffeeDiv.innerHTML = renderCoffees(filteredCoffees);
}

// updates filtered coffee array as input is registered to search-bar
function updateCoffeeSearch(e){
    e.preventDefault();
    var searchValue = searchEntry.value.toUpperCase()
    var filteredCoffees = [];
    // console.log(searchValue);
    coffees.forEach(function(coffee){
        if(coffee.name.toUpperCase().includes(searchValue) || coffee.roast.toUpperCase().includes(searchValue)){
            filteredCoffees.push(coffee)
        }
    })
    coffeeDiv.innerHTML = renderCoffees(filteredCoffees);
}

//local storage
var inputRoast = document.querySelector('#coffee-strength');
var inputName = document.querySelector('#coffee-name');
var addCoffeeBtn = document.querySelector('#add-coffee-submit');
addCoffeeBtn.addEventListener('click', addCoffee)


function addCoffee(e) {
    e.preventDefault();
    var id = coffees.length + 1;
    var addName = inputName.value;
    var addRoast = inputRoast.value;
    var coffee = {id: id, name: addName, roast: addRoast};
    coffees.push(coffee);
    console.log(coffees);
    coffeeDiv.innerHTML = renderCoffees(coffees);
}

// this works
var submitButton = document.querySelector('#submit');
var roastSelection = document.querySelector('#roast-selection');
var searchEntry = document.querySelector("#search-bar");
searchEntry.addEventListener("input",updateCoffeeSearch);
submitButton.addEventListener('click', updateCoffees);