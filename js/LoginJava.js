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

function checkUserLogin() {
    var cashierUser = document.getElementById('username').value;
    var cashierPassword = document.getElementById('password').value;

    //Set the user and pass as this for now, we can change for authentication later
    if (cashierUser == "josi" && cashierPassword == "ego") {
        window.open("transactionsPage.html");
        close();
    } else {
        setFormMessage(document, "error", "Invalid username/password combination");
    }

}


document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    loginForm.addEventListener("submit", e => {
        e.preventDefault();
    });

});
