const ITEMS = [
    {
        "id": "wte",
        "name": "Wooden Table",
        "price": 7120
    },
    {
        "id": "edl",
        "name": "Electric Drill",
        "price": 8399
    },
    {
        "id": "fsbd",
        "name": "Full Set Bed",
        "price": 12350
    },
    {
        "id": "sa",
        "name": "Sofa",
        "price": 17999
    },
    {
        "id": "stn",
        "name": "Samsung Television",
        "price": 34579
    },
    {
        "id": "wct",
        "name": "Wooden Closet",
        "price": 18199
    },
    {
        "id": "engn",
        "name": "Electric Nail Gun",
        "price": 9619
    },
    {
        "id": "wpft",
        "name": "10'Wide Plank 4 feet",
        "price": 1356
    },
    {
        "id": "ra",
        "name": "Roomba",
        "price": 11729
    }
];

const localStorage = window.localStorage;
let list = localStorage.getItem("erras_cart");

// erras_cart yung name ng storage
function main(id) {
    if (list == null) {
        localStorage.setItem("erras_cart", "[]");
    } 
    addToList(id);
}

function addToList(id) {
    const CatalogueDetail = ITEMS.find(x => x.id === id);
    let cart = JSON.parse(localStorage.getItem("erras_cart"));
    let isInCart = cart.find(x => x.id === id) ? (true) : (false);

    let itemDetail;
    let amount = parseInt(prompt(`How many ${CatalogueDetail.name} will you buy?`));
    if (!Number.isInteger(amount)) {
        alert("Action cancelled!");
        return;
    }
    if (isInCart) {
        itemDetail = cart.find(x => x.id === id);
        itemDetail.amount += amount;
        alert(`Item "${CatalogueDetail.name}" is already in cart now with an amount of ${itemDetail.amount}.`);
    } else {
        itemDetail = CatalogueDetail;
        itemDetail.amount = amount;
        if (amount <= 0) {
            alert("Action cancelled!");
            return;
        }
    }

    if (itemDetail.amount <= 0) {
        cart.filter((item, index, arr) => {
            if (item.id === itemDetail.id) {
                arr.splice(index, 1);
                return true;
            }
            return false;
        })
        alert("Removed from Cart!")
    } else {
        alert("Added to Cart!")
    }
    cart.push(itemDetail);
    localStorage.setItem("erras_cart", JSON.stringify(cart));
    list = localStorage.getItem("erras_cart");
}