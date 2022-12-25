export default function ItemForm(item) {
    let container = document.createElement("form");
    let itemAmountTextInput = document.createElement("input");
    let itemAmountAdd = document.createElement("button");
    let itemAmountRemove = document.createElement("button");

    itemAmountTextInput.value = item.amount;
    itemAmountTextInput.type = "number";

    itemAmountAdd.type = "button";
    itemAmountAdd.textContent = "+";
    itemAmountAdd.addEventListener("click", () => {
        item.amount++;    
        itemAmountTextInput.value = item.amount;
        changeAmount(item);
    });

    itemAmountRemove.type = "button";
    itemAmountRemove.textContent = "-";
    itemAmountRemove.addEventListener("click", () => {
        item.amount--;    
        itemAmountTextInput.value = item.amount;
        changeAmount(item);
    });

    container.appendChild(itemAmountAdd);
    container.appendChild(itemAmountTextInput);
    container.appendChild(itemAmountRemove);

    return container;
}

function changeAmount(item) {
    let cart = JSON.parse(localStorage.getItem("erras_cart"));
    let itemDetail = cart.find(x => x.id === item.id);
    itemDetail.amount = item.amount;
    window.localStorage.setItem("erras_cart", JSON.stringify(cart));
}