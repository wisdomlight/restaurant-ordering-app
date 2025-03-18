import { menuArray } from './data.js'

const listOfItems = document.getElementById('list-of-items')
const itemToPay = document.getElementById('item-to-pay')

/*adding one event listener to the whole document
    adding a data-* to the + button and possibly to the other divs??
    then with a function taking (e) as a parameter the element that was clicked will become clear
   */
document.addEventListener('click', function(e){
    if (e.target.dataset.emoji){
        renderBoughtItemHtml(e.target.dataset.emoji)
    } else if(e.target.dataset.name){
        renderBoughtItemHtml(e.target.dataset.name)
     } else if(e.target.dataset.addItem){
        renderBoughtItemHtml(e.target.dataset.addItem)
    }

// YOUR ORDERS SECTION
// GENERATE HTML DISPLAYING THE NAME PRICE AND REMOVE FOR SELECTED ITEMS
function selectedItemHtml(nameOfItemSelected){
    let itemsHtml = '' ;
    menuArray.forEach((element) =>{
        if(element.name === nameOfItemSelected){
            itemsHtml += `<div class='item-bought'>
                            <h2 class='name-of-bought'>
                            ${nameOfItemSelected}   
                                <span class="remove" 
                                style="font-size: 10px"> remove</span>
                            </h2>
                            <p class='bought-price '>$${element.price}
                        </div>`
            
        }
    }
    )
    return itemsHtml

}
// RENDER HTML OF SELECTED ITEMS
function renderBoughtItemHtml(nameOfItemSelected){
    itemToPay.innerHTML += selectedItemHtml(nameOfItemSelected)
}

function itemsHtml(){
    let displayItemsHtml = ''
    menuArray.forEach(element => {
        displayItemsHtml +=
        `
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
        `
        
        }
    )
    return displayItemsHtml
}

function render(){
    listOfItems.innerHTML = itemsHtml()

}



render()
// console.log(itemshtml())


// notes
/* to avoind data-attributes naming  issues - 
the html can have dashes in it like add-tem but in the javascript it becomes additem*/