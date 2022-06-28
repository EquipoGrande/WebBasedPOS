var pageNumber;
var productList = new Array;
var testSale;

async function onloadInitialize(functionName) {
    pageNumber = 0; 
    await generateInventory().then(function(value) {
        productList = value;
    });
    generateButtonGrid(functionName);
}


function createButton(product, buttonGrid, inputFunction) {
    var button = document.createElement("button");
    
    button.setAttribute("type", "button");
    button.setAttribute("class", "col-md-4 col-6 btn btn-color1");
    button.innerHTML = product["productname"];

    button.onclick = function() {
        inputFunction(product);
    }

    buttonGrid.append(button);
}

async function modifyInventoryFunction(currentProduct) {
    document.getElementById("idtext").value = currentProduct["productid"];
    document.getElementById("productName").value = currentProduct["productname"];
    document.getElementById("currentInventory").value = await ModifyInventory.getInventoryOf(currentProduct["productid"]).then();
}

function saleButtonFunction(currentProduct) {
    document.getElementById("idText").value = currentProduct["productid"];
    document.getElementById("quantityInput").focus();
    document.getElementById("productName").value = currentProduct["productname"];
    //document.getElementById("productAmount").value = currentProduct["quantity"] + " " + currentProduct["units"];
}

function decrementPage() {
    pageNumber--;
    if (pageNumber < 0) {
        pageNumber = 0;
    }
}

function incrementPage() {
    pageNumber++;
    if (pageNumber > parseInt((productList.length-1)/15)) {
        pageNumber = parseInt((productList.length-1)/15);
    }
}

function generateButtonGrid(functionName) {
    var buttonGrid = document.getElementById("buttonGrid");
    buttonGrid.innerHTML = "";

    var maximumIndex = (pageNumber + 1) * 15;

    if (maximumIndex > productList.length) {
        maximumIndex = productList.length;
    }

    for (let i = (pageNumber*15); i < maximumIndex; i++) {
        createButton(productList[i], buttonGrid, functionName);
    }
}

/**
 * Add methods as event listeners for when the page loads
 */
window.addEventListener('load', onloadInitialize);