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
    var user = document.getElementById('username').value;
    var password = document.getElementById('password').value

    if (user == "josi" && password == "ego") {
        window.open("index.html");
    } else {
        setFormMessage(document, "error", "Invalid username/password combination");
    }

}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const resetPasswordForm = document.querySelector("#resetPassword");


    loginForm.addEventListener("submit", e => {
        e.preventDefault();

    });

    //Checks length for new username, not necessary for now but could help later
    // document.querySelectorAll(".form__input").forEach(inputElement => {
    //     inputElement.addEventListener("blur", e => {
    //         if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
    //             setInputError(inputElement, "Username must be at least 10 characters in length");
    //         }
    //     });

    //     inputElement.addEventListener("input", e => {
    //         clearInputError(inputElement);
    //     });
    // });
});