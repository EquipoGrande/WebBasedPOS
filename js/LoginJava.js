var userList = new Array;

async function roles() {
    userList = await findUsers();
}

function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

async function checkUserLogin() {
    await roles();
    var user = document.getElementById('username').value;
    var pass = document.getElementById('password').value;
    var accessGranted = false;

    for (let i = 0; i < userList.length; i++) {
        if ((user == userList[i]["username"]) && (pass == userList[i]["password"])) {
            accessGranted = true;
        }
    }

    // Set the user and pass as this for now, we can change for authentication later
    if (accessGranted == true) {
        window.open("transactionsPage.html");
        //close is still a work in progress
        close();
    } else {
        setFormMessage(document, "error", "Invalid username / password combination");
    }

}


document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    loginForm.addEventListener("submit", e => {
        e.preventDefault();
    });

});
