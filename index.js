import { menuArray } from './data.js'

const listOfItems = document.getElementById('list-of-items')
const itemToPay = document.getElementById('item-to-pay')
const totalEl = document.getElementById('total')

/*adding one event listener to the whole document
    adding a data-* to the + button and possibly to the other divs??
    then with a function taking (e) as a parameter the element that was clicked will become clear
   */
document.addEventListener('click', function(e){
    if (e.target.dataset.emoji){
        renderSelectedItemHtml(e.target.dataset.emoji)
        renderSelectedItemsTotal(totalSelectedItemsPrice)
    } else if(e.target.dataset.name){
        renderSelectedItemHtml(e.target.dataset.name)
        renderSelectedItemsTotal(totalSelectedItemsPrice)
     } else if(e.target.dataset.addItem){
        renderSelectedItemHtml(e.target.dataset.addItem)
        renderSelectedItemsTotal(totalSelectedItemsPrice)
    } else if(e.target.classList.contains('remove')){
        removeItemFromTotal(e.target)
        renderSelectedItemsTotal(totalSelectedItemsPrice)
        e.target.parentElement.parentElement.remove()
    }
}
)

let totalSelectedItemsPrice = 0;
// let elementPrice = 0;

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
                            <p class="bought-price" data-price="${element.price}">$${element.price}
                        </div>`
            totalSelectedItemsPrice += element.price
            elementPrice = element.price
            }
        }
    )
    return itemsHtml

}

// TOTAL OF SELECTED ITEMS
function renderSelectedItemsTotal(total){
        totalEl.innerHTML = `Total is ${total}`

}

// RENDER HTML OF SELECTED ITEMS
function renderSelectedItemHtml(nameOfItemSelected){
    itemToPay.innerHTML += selectedItemHtml(nameOfItemSelected)
}

// REMOVE PRICE OF REMOVED SELECTED ITEM FROM ORDER
let priceValue;
function removeItemFromTotal(targetElement){
    const grandParentElement = targetElement.parentElement.parentElement
    const secondChild = grandParentElement.children[1]
    priceValue = secondChild.dataset.price

    totalSelectedItemsPrice -= priceValue
    priceValue = 0
    //the function modifying global variables - priceValue and 
}
// function removeItemFromTotal(param){
//     document.querySelectorAll('.remove').forEach(span => {
//         span.addEventListener('click', function(e) {
//             if(param){
//                 const grandParentElement = e.target.parentElement.parentElement
//                 const secondChild = grandParentElement.children[1]
//                 const priceText = secondChild.textContent
//                 priceValue = parseFloat(secondChild.dataset.price)
//                 totalSelectedItemsPrice -= priceValue
//                 priceValue = 0
//             }
//         })
//     })
// }


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

// notes
/* to avoind data-attributes naming  issues - 
the html can have dashes in it like add-tem but in the javascript it becomes additem*/