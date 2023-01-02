// Second Stage ng cart.js
// Is para sa pag generate nung mga details nung item na nasa cart
// This includes: name, price, and images

const localStorage = window.localStorage;
// Always start with no items in the array
localStorage.setItem("v_items", "[]");

export default function ItemDetail(item, index) {
    let container = document.createElement("div");
    let check = document.createElement("input");
    let itemImg = document.createElement("img");
    let itemName = document.createElement("h3");
    let itemPrice = document.createElement("h4");
    
    let priceFormat = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PHP'
    });

    check.type = "checkbox";
    check.onclick = () => {
        let parsed_items = JSON.parse(localStorage.getItem("v_items"));
        if (check.checked) {
            if (parsed_items === null) parsed_items = [];
            parsed_items.push(index);
        } else {
            parsed_items.filter((item, i, arr) => {
                if (item === index) {
                    arr.splice(i, 1);
                    return true;
                }
                return false;
            })
        }
        localStorage.setItem("v_items", JSON.stringify(parsed_items));
    }

    itemImg.src = item.picture;
    itemImg.classList.add("item-img") 
    itemName.textContent = item.name;
    itemPrice.textContent = priceFormat.format(item.price);

    let mainDetail = document.createElement("div");
    mainDetail.appendChild(itemName);
    mainDetail.appendChild(itemPrice);

    container.appendChild(check);
    container.appendChild(itemImg);
    container.appendChild(mainDetail);

    container.classList.add("item-detail");
    mainDetail.classList.add("main-detail")

    return container;
}