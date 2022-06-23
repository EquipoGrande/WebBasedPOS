var g_sizeToggle = false;

function toggleFontSize() {
    let fontSize = g_sizeToggle ? '200%' : '100%';
    document.getElementById('content').style.fontSize = fontSize;
}

function toggleButtonSize() {
    g_sizeToggle = !g_sizeToggle;
    if (g_sizeToggle) {
        document.querySelectorAll('.btn').forEach(element => {
            element.classList.add('btn-lg');
        });
    } else {
        document.querySelectorAll('.btn').forEach(element => {
            element.classList.remove('btn-lg');
        });
    }

}

function toggleSize() {
    toggleButtonSize();
    toggleFontSize();
}

function logoutButton() {
    window.open("Login.html");
    close();
}
