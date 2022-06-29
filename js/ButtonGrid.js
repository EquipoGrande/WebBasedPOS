var pageNumber;
var productList = new Array;
var testSale;
var numberOfButtons = 15;
var now = new Date().getTime();

async function onloadInitialize(functionName) {
    pageNumber = 0; 
    updatePageNumber();
    await generateInventory().then(function(value) {
        productList = value;
    });
    generateButtonGrid(functionName);
    if(window.name == "Accessibility Mode"){
        g_sizeToggle = true;
        correctSizes();
    }
}

async function updatePageNumber() {
    if(pageNumber != null)
        document.getElementById("pageNumber").innerHTML = (pageNumber+1);
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

async function getInventoryOf(currentId){
    var promise = new Promise(function(resolve, reject){
        var getRequest = new XMLHttpRequest();
        getRequest.responseType = "json";
        getRequest.open('GET', 'http://localhost:3000/api/inventory/getinventorybyid?productid=' + currentId);
        getRequest.onload = function () {
            if (getRequest.status == 200) {
                resolve(getRequest.response);
            } else {
                reject(Error(getRequest.statusText));
            };
            getRequest.onerror = function() {
                reject(Error('Cannot find JSON data'));
            }
        }
        getRequest.send();
    });
[]
    var inventoryNum = await promise;
    var endPoint = inventoryNum[0]["stockquantity"];
    return endPoint;
}

async function modifyInventoryFunction(currentProduct) {
    document.getElementById("idtext").value = currentProduct["productid"];
    document.getElementById("productName").value = currentProduct["productname"];
    document.getElementById("currentInventory").value = await getInventoryOf(currentProduct["productid"]).then();
}

async function saleButtonFunction(currentProduct) {
    document.getElementById("idText").value = currentProduct["productid"];
    document.getElementById("quantityInput").focus();
    document.getElementById("productName").value = currentProduct["productname"];
    document.getElementById("productAmount").value = await getInventoryOf(currentProduct["productid"]).then() + " kg left";
}

async function editInventoryFunction(currentProduct) {
    document.getElementById("productIDInput").value = currentProduct["productid"];
    document.getElementById("productName").value = currentProduct["productname"];
    document.getElementById("sellPrice").value = currentProduct["sellprice"];
    document.getElementById("purchasePrice").value = currentProduct["purchaseprice"];
    if(currentProduct["sellunit"] == 1) {
        document.getElementById("radioKgs").checked = true;
    } else {
        docuent.getElementById("radioIndividual").checked = true;
    }
}

function decrementPage() {
    pageNumber--;
    if (pageNumber < 0) {
        pageNumber = 0;
    }
    updatePageNumber();
}

function incrementPage() {
    pageNumber++;
    if (pageNumber > parseInt((productList.length-1)/numberOfButtons)) {
        pageNumber = parseInt((productList.length-1)/numberOfButtons);
    }
    updatePageNumber();
}

function toggleSizeAndGenerateButtonGrid(){
    g_sizeToggle = !g_sizeToggle;
    if(g_sizeToggle){
        window.name = "Accessibility Mode";
    }else{
        window.name = "Standard Mode";
    }
    correctSizes();
}

function correctSizes(){
    toggleButtonSize();
    pageNumber = 0;
    updatePageNumber();
    generateButtonGrid();
    toggleFontSize();
}

function generateButtonGrid(functionName) {
    var buttonGrid = document.getElementById("buttonGrid");
    buttonGrid.innerHTML = "";
    numberOfButtons = g_sizeToggle ? 6 : 15;

    var maximumIndex = (pageNumber + 1) * numberOfButtons;

    if (maximumIndex > productList.length) {
        maximumIndex = productList.length;
    }

    for (let i = (pageNumber*numberOfButtons); i < maximumIndex; i++) {
        createButton(productList[i], buttonGrid, functionName);
    }
}

/**
 * Add methods as event listeners for when the page loads
 */
window.addEventListener('load', onloadInitialize);