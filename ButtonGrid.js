var pageNumber;
var testInventory;

function onloadInitialize() {
    pageNumber = 0; 
    testInventory = new CurrentInventory();
    generateButtonGrid(0);
}


function createButton(product, buttonGrid) {
    var button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("class", "col-md-4 col-6 btn btn-primary");

    button.innerHTML = product["name"];

    button.onclick = function(){
        document.getElementById("test").append(product["name"]);
    }

    buttonGrid.append(button);
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
        createButton(testInventory.productList[i], buttonGrid);
    }
}