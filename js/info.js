// This file is para sa user information na gagamitin sa pag-checkout ng cart
// At yung mismong pag=checkout ng items

const localStorage = window.localStorage;

// Values of input
let nameElement = document.getElementById("name");
let numberElement = document.getElementById("number");
let cardElement = document.getElementById("card-number");
let emailElement = document.getElementById("email");
let addressElement = document.getElementById("address");

let localInfo = localStorage.getItem("userInfo");

if (localInfo != null) {
    localInfo = JSON.parse(localInfo);
    setupInformation();
}

function setupInformation() {
    nameElement.value = localInfo.name;
    numberElement.value = localInfo.number;
    cardElement.value = localInfo.card;
    emailElement.value = localInfo.email;
    addressElement.value = localInfo.address;
}

let submitBtn = document.getElementById("cart-submit");
submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let indexArray = JSON.parse(localStorage.getItem("v_items"));
    let itemArray = JSON.parse(localStorage.getItem("erras_cart"));

    if (itemArray === null || itemArray.length === 0) {
        alert("Your cart is empty.")
        return
    }

    if (indexArray === null || indexArray.length === 0) {
        alert("Use the checkbox to select items which you would want to purchase.");
        return
    }

    if (nameElement.value === "" || numberElement.value === "" ||
        cardElement.value === "" || emailElement.value === "" ||
        addressElement.value === "") {
            alert("Please complete the information form first.");
    } else {
        let totalPrice = totalPricing(indexArray, itemArray);
        let info = {
            name: nameElement.value,
            number: numberElement.value,
            card: cardElement.value,
            email: emailElement.value,
            address: addressElement.value
        }
        alert("Please confirm the following:")
        let priceConfirm = prompt(`${totalPrice}`);
        if (priceConfirm === "Y" || priceConfirm === "YES" || priceConfirm === "y" || priceConfirm === "yes") {
            let confirm = prompt(
                `Is the information provided correct? [Y/N]:\n
                Name: ${info.name}\n
                Address: ${info.address}\n
                Card Number: ${info.card}\n
                Email: ${info.email}\n
                Phone Number: ${info.number}`
                );
            if (confirm === "Y" || confirm === "y" || confirm === "YES" || confirm === "yes") {
                localStorage.setItem("userInfo", JSON.stringify(info));
                let fMessage = `Item will be shipped to ${info.name} at ${info.address} and the billing would be processed at ${info.card}.`
                let sMessage = `Please wait for further confirmation at your email ${info.email} and number ${info.number}.`
                alert(fMessage);
                alert(sMessage);
                newCart(indexArray, itemArray);
                location.reload();
            } else {
                alert("Action Cancelled");
            }
        } else {
            alert("Action Cancelled");
        }
    }
});

function totalPricing(indexArray, itemArray) {
    let msgSTR = "Item Confirmation [Y/N]:"
    let total = 0;
    indexArray.map(index => {
        msgSTR += `
            \nName: ${itemArray[index].name}
            \nAmount: ${itemArray[index].amount}
            \nPrice: ${itemArray[index].price * itemArray[index].amount}
        `
        total += itemArray[index].price * itemArray[index].amount;
    })
    msgSTR += `\n\nTotal Price: ${total}`
    return msgSTR
}

function newCart(indexArray, itemArray) {
    let newArray = [];
    itemArray.map((item, index) => {
        if (!indexArray.includes(index)) {
            newArray.push(item);
        }
    })
    console.log(newArray)
    localStorage.setItem("erras_cart", JSON.stringify(newArray));
    localStorage.setItem("v_items", "[]");
}