/**
 * Fetch the Navbar and insert it into the page
 */
async function loadNavbar() {
    let checkManager = localStorage.getItem('isManager');
    // let checkCashier = localStorage.getItem('isCashier');

    console.log(checkManager);
    fetch('/Navbar.html').then(response => response.text()).then(function (html) {
        var parser = new DOMParser();
        var navbar = parser.parseFromString(html, "text/html");
        var div = navbar.getElementById('headerDiv');
        document.getElementById('header').appendChild(div);

        // if (checkManager == 'manager') {
        //     console.log("Manager")
        // }
        // else if (checkCashier == 'cashier') {
        //     console.log("Cashier")
        // }
    });
}

/**
 * Init the google translate element. This function should not be called directly
 * as it is the callback method for the google translate api
 */
function googleTranslateElementInit() {
    new google.translate.TranslateElement({ pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE }, 'google_translate_element');
}

/**
 * Load the google translate elements into the page. This should be called after loadNavbar()
 */
function loadGoogleTranslate() {
    var googleScript = document.createElement('script');
    googleScript.type = 'text/javascript';
    googleScript.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(googleScript);
}

/**
 * Show a bootstrap alert inside the alertContainer. The alert will expire after 5 seconds
 * @param {string} alertType The bootstrap alert type (alert-sucess, alert-danger, etc.)
 * @param {string} text The text for the alert
 */
function showAlert(alertType, text) {
    let alertDiv = document.createElement('div');
    alertDiv.classList.add('alert', alertType);

    innerElement = document.createElement('p');
    innerElement.innerHTML = text;
    alertDiv.appendChild(innerElement);

    document.getElementById("alertContainer").appendChild(alertDiv);

    window.setTimeout(() => alertDiv.remove(), 5000);
}

/**
 * Add methods as event listeners for when the page loads
 */
window.addEventListener('load', loadNavbar);
window.addEventListener('load', loadGoogleTranslate);