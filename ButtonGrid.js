function createButton(product, buttonGrid) {
    var button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("class", "col-md-4 col-6 btn btn-primary");

    button.innerHTML = "test";

    buttonGrid.append(button);
}

function generateButtonGrid(page) {
    var buttonGrid = document.getElementById("buttonGrid");
    buttonGrid.innerHTML = "";

    createButton("A", buttonGrid);
    createButton("A", buttonGrid);

    /*
    var testInventory = new CurrentInventory();
    var maximumIndex = (page + 1) * 15;

    if (maximumIndex < testInventory.numberOfElements) {
        maximumIndex = testInventory.numberOfElements;
    }

    for (let i = (page*15); i < maximumIndex; i++) {
        
    }
    */
}