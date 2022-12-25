import ItemDetail from "./itemDetail.js";
import ItemForm from "./itemForm.js";

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
    cart.forEach((item, index) => {
        let itemContainer = document.createElement("div");
        let itemDetail = ItemDetail(item, index);
        let itemForm = ItemForm(item);
        let itemRemoveBtn = document.createElement("button");
        itemRemoveBtn.textContent = "DELETE";

        itemContainer.appendChild(itemDetail);
        itemContainer.appendChild(itemForm);
        itemContainer.appendChild(itemRemoveBtn);

        CART_CONTAINER.appendChild(itemContainer);
    });
}

function makeForm() {
    let container = document.createElement("form");

}