// This file is para sa user information na gagamitin sa pag-checkout ng cart
// At yung mismong pag=checkout ng items

let bodyElement = document.querySelector("body");

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
        let priceConfirm = prompt(`Total Price: ${totalPrice[0]}`);
        if (priceConfirm === "Y" || priceConfirm === "YES" || priceConfirm === "y" || priceConfirm === "yes") {
            let confirm = prompt(
                `Is the information provided correct? [Y/N]:\n\nName: ${info.name}\n\nAddress: ${info.address}\n\nCard Number: ${info.card}\n\nEmail: ${info.email}\n\nPhone Number: ${info.number}\n`
                );
            if (confirm === "Y" || confirm === "y" || confirm === "YES" || confirm === "yes") {
                localStorage.setItem("userInfo", JSON.stringify(info));
                let fMessage = `Item will be shipped to ${info.name} at ${info.address}.\nThe billing would be processed at ${info.card}.`
                let sMessage = `Please wait for further confirmation at your email ${info.email} and number ${info.number}.`
                alert(fMessage);
                alert(sMessage);
                newCart(indexArray, itemArray);
                receipt(info, totalPrice[1]);
                // location.reload();
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
    msgSTR += `\n\nTotal Price: ${total} + 50.00 shipping fee`
    return [msgSTR, total]
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

function receipt(info, price) {
    let refNum = Math.floor(Math.random() * (1000 - 100 + 1) + 100);
    let priceFormat = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PHP'
    });
    let receiptContainer = document.createElement("div");
    receiptContainer.innerHTML = `
        <div id="receipt">
            <h1>Ref number: 0 n${refNum}</h1>
            <div class="logo-receipt-container">
                <img src="../imgs/general_photos/site_logo.png" alt="cart">
            </div>
            <p>Total Value Charged: ${priceFormat.format(price + 50)}</p>
            <p>Item will be shipped to ${info.name} at ${info.address}.</p> 
            <p>Billing would be processed at ${info.card}.</p>
            <br>
            <p>Customer: ${info.name}</p>
            <p>Phone Number: ${info.number}</p>
            <p>Billed at Card No: ${info.card}</p>
            <p>Email: ${info.email}</p>
            <button onclick="location.reload()">Confirm!</button>
        </div>
    `
    receiptContainer.classList.add("overlay")
    bodyElement.append(receiptContainer)
}