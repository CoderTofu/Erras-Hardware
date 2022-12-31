export default function ItemForm(item) {
    let container = document.createElement("form");
    let itemAmountTextInput = document.createElement("h3");
    let itemAmountAdd = document.createElement("button");
    let itemAmountDeduct = document.createElement("button");

    itemAmountTextInput.textContent = item.amount;
    itemAmountTextInput.type = "number";

    itemAmountAdd.type = "button";
    itemAmountAdd.textContent = "+";
    itemAmountAdd.addEventListener("click", () => {
        item.amount++;    
        itemAmountTextInput.textContent = item.amount;
        changeAmount(item);
    });

    itemAmountDeduct.type = "button";
    itemAmountDeduct.textContent = "-";
    itemAmountDeduct.addEventListener("click", () => {
        if (item.amount === 1) return
        item.amount--;    
        itemAmountTextInput.textContent = item.amount;
        changeAmount(item);
    });

    container.appendChild(itemAmountDeduct);
    container.appendChild(itemAmountTextInput);
    container.appendChild(itemAmountAdd);

    container.classList.add("amount-input");
    itemAmountAdd.classList.add("amount-btn");
    itemAmountDeduct.classList.add("amount-btn");

    return container;
}

function changeAmount(item) {
    let cart = JSON.parse(localStorage.getItem("erras_cart"));
    let itemDetail = cart.find(x => x.id === item.id);
    itemDetail.amount = item.amount;
    window.localStorage.setItem("erras_cart", JSON.stringify(cart));
}