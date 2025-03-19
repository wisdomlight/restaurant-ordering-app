//this is a chatgpt refactored version of the code. this code lists items and there total and is able to remove items from the list and change the total

import { menuArray } from './data.js'

const listOfItems = document.getElementById('list-of-items')
const itemToPay = document.getElementById('item-to-pay')
const totalEl = document.getElementById('total')

// Global Variables
let totalSelectedItemsPrice = 0;
let priceValue = 0;

// Event Listener for Click Events
document.addEventListener('click', function(e) {
    handleItemSelection(e);
    handleRemoveItem(e);
});

// Handle item selection (adding to the cart)
function handleItemSelection(e) {
    if (e.target.dataset.emoji || e.target.dataset.name || e.target.dataset.addItem) {
        const itemName = e.target.dataset.emoji || e.target.dataset.name || e.target.dataset.addItem;
        renderSelectedItemHtml(itemName);
        renderSelectedItemsTotal(totalSelectedItemsPrice);
    }
}

// Handle item removal (removing from the cart)
function handleRemoveItem(e) {
    if (e.target.classList.contains('remove')) {
        removeItemFromTotal(e.target);
        renderSelectedItemsTotal(totalSelectedItemsPrice);
        e.target.parentElement.parentElement.remove();
    }
}

// Generate HTML for the selected item
function selectedItemHtml(nameOfItemSelected) {
    let itemsHtml = '';
    menuArray.forEach(element => {
        if (element.name === nameOfItemSelected) {
            itemsHtml += `
                <div class='item-bought'>
                    <h2 class='name-of-bought'>
                        ${nameOfItemSelected}
                        <span class="remove" style="font-size: 10px"> remove</span>
                    </h2>
                    <p class="bought-price" data-price="${element.price}">$${element.price}</p>
                </div>
            `;
            totalSelectedItemsPrice += element.price;
            priceValue = element.price;
        }
    });
    return itemsHtml;
}

// Update the total displayed on the page
function renderSelectedItemsTotal(total) {
    totalEl.innerHTML = `Total is $${total}`;
}

// Render the selected item HTML into the DOM
function renderSelectedItemHtml(nameOfItemSelected) {
    itemToPay.innerHTML += selectedItemHtml(nameOfItemSelected);
}

// Remove the price of the removed selected item from the order
function removeItemFromTotal(targetElement) {
    const grandParentElement = targetElement.parentElement.parentElement;
    const secondChild = grandParentElement.children[1];
    priceValue = parseFloat(secondChild.dataset.price); // Ensure priceValue is a number
    totalSelectedItemsPrice -= priceValue;
    priceValue = 0; // Optionally reset priceValue after using it
}

// Generate HTML for all menu items
function itemsHtml() {
    return menuArray.map(element => `
        <div class="listed-items">
            <div class="item">
                <div class="emoji-container" id="emoji-container">
                    <img class="emoji" src='${element.emoji}' alt='${element.name}' data-emoji='${element.name}'>
                </div>
                <div class="description" id="${element.name}">
                    <h2 class="name" data-name="${element.name}">${element.name}</h2>
                    <p class="ingredients" data-name="${element.name}">${element.ingredients}</p>
                    <p class="price" data-name="${element.name}">$${element.price}</p>
                </div>
                <div class="add-order-btn" id='add-item'>
                    <div class="i-border">
                        <i class="fa-solid fa-plus" data-add-item='${element.name}'></i>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Render the menu items
function render() {
    listOfItems.innerHTML = itemsHtml();
}

// Initial render of the menu
render();
