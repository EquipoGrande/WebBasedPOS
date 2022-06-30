var g_sizeToggle = false;

function toggleFontSize() {
    let fontSize = g_sizeToggle ? '200%' : '100%';
    document.body.style.fontSize = fontSize;
}

function toggleButtonSize() {
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
    g_sizeToggle = !g_sizeToggle;
    if(g_sizeToggle){
        window.name = "Accessibility Mode";
    }else{
        window.name = "Standard Mode";
    }
    toggleButtonSize();
    toggleFontSize();

    if(typeof buttonGridObject !== 'undefined') {
        buttonGridObject.pageNumber = 0;
        buttonGridObject.generateButtonGrid();
    }
}

function logoutButton() {
    window.open("Login.html");
    close();
}
