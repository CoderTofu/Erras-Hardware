const CART_CONTAINER = document.getElementById("items-container");
const INFO_CONTAINER = document.getElementById("info-container");
const localStorage = window.localStorage;

let list = localStorage.getItem("erras_cart");
let userInfo = localStorage.getItem("erras_user_info");

if (list === null) {
    let NoItemsHeader = document.createElement("h3");
    NoItemsHeader.textContent = "Your cart is empty.";
    CART_CONTAINER.appendChild(NoItemsHeader);
} else {
    makeCartList();
}

if (userInfo === null) {
    let NoInfoHeader = document.createElement("h3");
    NoInfoHeader.textContent = "You do not have any information.";
    INFO_CONTAINER.appendChild(NoInfoHeader);
}

function makeCartList() {
    let cart = JSON.parse(localStorage.getItem("erras_cart"));
    cart.forEach(item => {
        let itemContainer = document.createElement("div");

        let itemDetail = document.createElement("div");
        let itemImg = document.createElement("img");
        let itemName = document.createElement("h3");
        let itemPrice = document.createElement("h4");
        
        let itemForm = document.createElement("form");
        let itemAmountTextInput = document.createElement("input");
        let itemAmountAdd = document.createElement("button");
        let itemAmountRemove = document.createElement("button");

        let itemRemoveBtn = document.createElement("button");
    });
}