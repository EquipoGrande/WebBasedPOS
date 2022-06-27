
/**
 * Fetch the Navbar and insert it into the page
 */
function loadNavbar() {
    fetch('/Navbar.html').then( response => response.text()).then( function (html) {
        var parser = new DOMParser();
        var navbar = parser.parseFromString(html, "text/html");
        console.log(navbar);
        var div = navbar.getElementById('headerDiv');
        console.log(div);
        document.getElementById('header').appendChild(div);
    });
}

/**
 * Init the google translate element. This function should not be called directly
 * as it is the callback method for the google translate api
 */
function googleTranslateElementInit() {
    new google.translate.TranslateElement({pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');
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
 * Add methods as event listeners for when the page loads
 */
window.addEventListener('load', loadNavbar);
window.addEventListener('load', loadGoogleTranslate);