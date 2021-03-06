var productList = new Array;
var testSale;
var numberOfButtons = 15;
var buttonGridObject;
var chosenButtonText;

async function onloadInitialize(functionName) {
    await generateInventory().then(function(value) {
        productList = value;
    });
    buttonGridObject = new ButtonGrid(function(currentProduct) {functionName(currentProduct)});
}

function correctSizes() {

}

function createButton(product, buttonGrid, inputFunction) {
    var button = document.createElement("button");
    
    button.setAttribute("type", "button");
    button.setAttribute("class", "col-md-4 col-6 btn btn-color1");
    button.style.fontSize = g_sizeToggle ? '150%' : '100%';
    button.innerHTML = product["productname"];

    button.onclick = function() {
        chosenButtonText = button.innerHTML.substring(78,button.innerHTML.length-14);
        inputFunction(product);
    }

    buttonGrid.append(button);
}

async function getInventoryOf(currentId){
    var promise = new Promise(function(resolve, reject){
        var getRequest = new XMLHttpRequest();
        getRequest.responseType = "json";
        getRequest.open('GET', 'http://localhost:3000/api/inventory/getinventorybyid?productid=' + currentId);
        getRequest.onload = function () {
            if (getRequest.status == 200) {
                resolve(getRequest.response);
            } else {
                showAlert('alert-danger', 'Error getting inventory ' + getRequest.statusText);
                reject(Error(getRequest.statusText));
            };
        }
        getRequest.onerror = function() {
            showAlert('alert-danger', 'Error getting inventory ' + getRequest.statusText);
            reject(Error('Cannot find JSON data'));
        }
        getRequest.send();
    });
    var inventoryNum = await promise;
    var endPoint = inventoryNum[0]["stockquantity"];
    return endPoint;
}

async function modifyInventoryFunction(currentProduct) {
    document.getElementById("idtext").value = currentProduct["productid"];
    document.getElementById("productName").value = chosenButtonText;
    document.getElementById("currentInventory").value = await getInventoryOf(currentProduct["productid"]).then();
}

async function saleButtonFunction(currentProduct) {
    console.log("Sale function");
    document.getElementById("idText").value = currentProduct["productid"];
    document.getElementById("quantityInput").focus();
    document.getElementById("productName").value = chosenButtonText;
    document.getElementById("productAmount").value = await getInventoryOf(currentProduct["productid"]).then() + " kg left";
}

async function editInventoryFunction(currentProduct) {
    document.getElementById("productIDInput").value = currentProduct["productid"];
    document.getElementById("productName").value = chosenButtonText;
    document.getElementById("sellPrice").value = currentProduct["sellprice"];
    document.getElementById("purchasePrice").value = currentProduct["purchaseprice"];
    if(currentProduct["sellunit"] == 1) {
        document.getElementById("radioKgs").checked = true;
    } else {
        document.getElementById("radioIndividual").checked = true;
    }
}

async function updateButtonGrid() {
    await generateInventory().then(function(value) {
        productList = value;
    });
    buttonGridObject.generateButtonGrid();
}

class ButtonGrid {
    constructor(functionName) {
        this.buttonFunction = functionName;
        this.pageNumber = 0;
        this.generateButtonGrid();
    }

    decrementPage() {
        this.pageNumber--;
        if (this.pageNumber < 0) {
            this.pageNumber = 0;
        }
        this.generateButtonGrid();
        this.updatePageNumber();
    }

    incrementPage() {
        this.pageNumber++;
        if (this.pageNumber > parseInt((productList.length-1)/numberOfButtons)) {
            this.pageNumber = parseInt((productList.length-1)/numberOfButtons);
        }
        this.generateButtonGrid();
        this.updatePageNumber();
    }

    updatePageNumber() {
        document.getElementById("pageNumber").innerHTML = (this.pageNumber + 1);
    }

    generateButtonGrid() {
        var buttonGrid = document.getElementById("buttonGrid");
        buttonGrid.innerHTML = "";
        numberOfButtons = g_sizeToggle ? 6 : 15;
    
        var maximumIndex = (this.pageNumber + 1) * numberOfButtons;
    
        if (maximumIndex > productList.length) {
            maximumIndex = productList.length;
        }
    
        for (let i = (this.pageNumber*numberOfButtons); i < maximumIndex; i++) {
            createButton(productList[i], buttonGrid, this.buttonFunction);
        }
        this.updatePageNumber();
    }
}

/**
 * Add methods as event listeners for when the page loads
 */
window.addEventListener('load', onloadInitialize);