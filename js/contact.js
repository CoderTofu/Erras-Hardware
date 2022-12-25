const firstNameElement = document.getElementById("fname");
const lastNameElement = document.getElementById("lname");
const emailElement = document.getElementById("email");
const msgElement = document.getElementById("message");

const localStorage = window.localStorage;
let user_contact = localStorage.getItem("user_contact");

if (user_contact !== null) {
    user_contact = JSON.parse(user_contact);
    firstNameElement.value = user_contact.fname;
    lastNameElement.value = user_contact.lname;
    emailElement.value = user_contact.email;
}

const form_btn = document.getElementById("form-btn");

form_btn.addEventListener("click", () => {
    if (firstNameElement.value !== "" &&
        lastNameElement.value !== "" &&
        emailElement.value !== "" &&
        msgElement.value !== "") {
            let user_details = {
                "fname": firstNameElement.value,
                "lname": lastNameElement.value,
                "email": emailElement.value,
            }
            msgElement.value = "";
            user_details = JSON.stringify(user_details);
            localStorage.setItem("user_contact", user_details);
            alert("Message sent!")
    } else {
        alert("Please complete all the fields first.")
    }
})
