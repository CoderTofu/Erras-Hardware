// Para sa shop.html
// This file is used for the onclick event sa button pag gustong
// mag add to cart ng user
const ITEMS = [
    {
        "id": "wte",
        "name": "Wooden Table",
        "price": 7120,
        "picture": "https://cdn.decoist.com/wp-content/uploads/2017/03/Wooden-dining-table-top-adds-elegance-and-textural-beauty-to-the-dining-room.jpg"
    },
    {
        "id": "edl",
        "name": "Electric Drill",
        "price": 8399,
        "picture": "https://cdn.shopify.com/s/files/1/0016/5032/7651/products/fd_1024x1024.jpg?v=1570589857"
    },
    {
        "id": "fsbd",
        "name": "Full Set Bed",
        "price": 12350,
        "picture": "https://www.boconcept.com/on/demandware.static/-/Sites-master-catalog/default/dw0b805ada/images/1220000/1223156.jpg"
    },
    {
        "id": "sa",
        "name": "Sofa",
        "price": 17999,
        "picture": "https://www.boconcept.com/on/demandware.static/-/Sites-master-catalog/default/dwd78307a1/images/160000/160183.jpg"
    },
    {
        "id": "stn",
        "name": "Samsung Television",
        "price": 34579,
        "picture": "https://images.samsung.com/is/image/samsung/ph-qledtv-q60t-qa50q60tagxxp-lperspectiveblack-225892991?$720_576_PNG$"
    },
    {
        "id": "wct",
        "name": "Wooden Closet",
        "price": 18199,
        "picture": "https://i.pinimg.com/originals/c2/83/6f/c2836fe683b2af31300331695f51be0c.jpg"
    },
    {
        "id": "engn",
        "name": "Electric Nail Gun",
        "price": 9619,
        "picture": "https://res.cloudinary.com/rsc/image/upload/b_rgb:FFFFFF,c_pad,dpr_1.0,f_auto,h_337,q_auto,w_600/c_pad,h_337,w_600/R1449886-01?pgw=1"
    },
    {
        "id": "wpft",
        "name": "10'Wide Plank 4 feet",
        "price": 1356,
        "picture": "https://sc04.alicdn.com/kf/UTB8AAy.oHnJXKJkSahGq6xhzFXaP.jpg"
    },
    {
        "id": "ra",
        "name": "Roomba",
        "price": 11729,
        "picture": "https://cdn.vox-cdn.com/thumbor/8jV10mdym-UDXEnrVmpSbYpyRu4=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/13147673/dseifert_180924_2969_0039.jpg"
    }
];

const localStorage = window.localStorage;
let list = localStorage.getItem("erras_cart");

// This is the click event that will happen if a user presses add to cart
function main(id) {
    // if cart does not exist yet then create one
    if (list == null) {
        localStorage.setItem("erras_cart", "[]");
    } 
    // isang if statement lang ginamit dahil either way kailangan siya iadd sa cart
    // else just add it to the cart
    addToList(id);
}

function addToList(id) {
    // CatalogueDetail is yung reference to the item na mismo na naka prestored na sa code
    // Siya na yung object mismo na kailangan sa code na dadagdagan na lang
    const CatalogueDetail = ITEMS.find(x => x.id === id);
    // Since gumamit tayo local storage kailangan muna iparse para gawing JSON at mas madaling mabasa
    let cart = JSON.parse(localStorage.getItem("erras_cart"));
    // Boolean to check if the item is already in the cart
    let isInCart = cart.find(x => x.id === id) ? (true) : (false);

    // Gagamitin natin as reference kung ano ilalagay sa cart
    let itemDetail;
    let amount = parseInt(prompt(`How many ${CatalogueDetail.name} will you buy?`));
    // Pag walang nilagay o kaya hindi valid like 0.5 lang di tatanggapin at icacancel yung pagaddd niya
    if (!Number.isInteger(amount)) {
        alert("Action cancelled!");
        return;
    }
    // Pag nasa cart na dadagdagan na lang yung amount
    if (isInCart) {
        itemDetail = cart.find(x => x.id === id);
        itemDetail.amount += amount;
        alert(`Adding ${amount} more to your cart.\nYou now have ${itemDetail.amount} in your cart.`);
    } 
    // Else initialize mo pa muna sa CatalogueDetail then dagdag properties for amount
    else {
        itemDetail = CatalogueDetail;
        itemDetail.amount = amount;
        cart.push(itemDetail);
    }

    // This is to check kung binabawasan ba ng user yung amount ng item
    // if ang ending ng amount sa item is less then or equal to 0 tatanggalin siya sa cart
    if (itemDetail.amount <= 0) {
        // filter out gamit yung id
        // kung ano magmatch yun tatanggalin ng function na to
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
    
    // Added na siya sa cart yey!
    localStorage.setItem("erras_cart", JSON.stringify(cart));
    list = localStorage.getItem("erras_cart");
}