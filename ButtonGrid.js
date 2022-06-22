var pageNumber;
var testInventory;
var testSale;

function onloadInitialize() {
    pageNumber = 0; 
    testInventory = new CurrentInventory();
    generateButtonGrid(0);
}


function createButton(product, buttonGrid, inputFunction) {
    var button = document.createElement("button");
    
    button.setAttribute("type", "button");
    button.setAttribute("class", "col-md-4 col-6 btn btn-color1");

    button.innerHTML = product["name"];

    button.onclick = function() {
        inputFunction(product);
    }

    buttonGrid.append(button);
}

function saleButtonFunction(currentProduct) {
    document.getElementById("idText").value = currentProduct["productID"];
    document.getElementById("quantityInput").focus();
    document.getElementById("productName").value = currentProduct["name"];
}

function decrementPage() {
    pageNumber--;
    if (pageNumber < 0) {
        pageNumber = 0;
    }
}

function incrementPage() {
    pageNumber++;
    if (pageNumber > parseInt((testInventory.numberOfElements-1)/15)) {
        pageNumber = parseInt((testInventory.numberOfElements-1)/15);
    }
}

function generateButtonGrid() {
    var buttonGrid = document.getElementById("buttonGrid");
    buttonGrid.innerHTML = "";

    var maximumIndex = (pageNumber + 1) * 15;

    if (maximumIndex > testInventory.numberOfElements) {
        maximumIndex = testInventory.numberOfElements;
    }

    for (let i = (pageNumber*15); i < maximumIndex; i++) {
        createButton(testInventory.productList[i], buttonGrid, saleButtonFunction);
    }
}