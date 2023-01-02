// This file is para sa pagloload ng mga items sa cart page.
// May dalawang main functions na naseperate sa file na to para mas malinis tignan

import ItemDetail from "./itemDetail.js";
import ItemForm from "./itemForm.js";

const CART_CONTAINER = document.getElementById("items-container");
const localStorage = window.localStorage;

let list = localStorage.getItem("erras_cart");

// Check whether may laman ba cart
if (list === null || list == "[]") {
    let NoItemsHeader = document.createElement("h3");
    NoItemsHeader.textContent = "Your cart is empty.";
    NoItemsHeader.classList.add("empty-cart-header");
    CART_CONTAINER.appendChild(NoItemsHeader);
} else {
    makeCartList();
}

function makeCartList() {
    CART_CONTAINER.innerHTML = "";
    let cart = JSON.parse(localStorage.getItem("erras_cart"));
    // For each item sa cart gumawa nung parang list type sa html na may details and form
    // Hence: itemDetail and itemForm
    cart.forEach((item, index) => {
        let itemContainer = document.createElement("div");
        let itemDetail = ItemDetail(item, index);
        let itemForm = ItemForm(item);
        let itemRemoveBtn = document.createElement("div");
        let itemRemoveImg = document.createElement("img");
        itemRemoveImg.src = "../imgs/general_photos/trash.png";
        itemRemoveBtn.addEventListener("click", () => itemRemove(cart, item))
        itemRemoveBtn.appendChild(itemRemoveImg);

        itemContainer.appendChild(itemDetail);
        itemContainer.appendChild(itemForm);
        itemContainer.appendChild(itemRemoveBtn);
        itemContainer.classList.add("item");
        itemRemoveBtn.classList.add("trash");

        CART_CONTAINER.appendChild(itemContainer);
    });
}

// This function is made para tanggalin yung item sa cart
function itemRemove(cart, itemDetail) {
    cart.filter((item, index, arr) => {
        if (item.id === itemDetail.id) {
            arr.splice(index, 1);
            return true;
        }
        return false;
    })
    localStorage.setItem("v_items", "[]");
    localStorage.setItem("erras_cart", JSON.stringify(cart));
    makeCartList();
}
