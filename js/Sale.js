function transactionOnload() {
    onloadInitialize();
    testSale = new Sale(testInventory);
    document.getElementById("sellLine").onclick = function() {testSale.addItemButton()};
    document.getElementById("removeLine").onclick = function() {testSale.removeItem()};
    document.getElementById("quantityInput").onchange =  function() {testSale.updatePrice()};
    document.getElementById("idText").onchange =  function() {testSale.updateItemName()};
    resetForm();
    document.getElementById("totalPrice").value = "";
}

function resetForm() {
    document.getElementById("productTotal").value = "€ 0.00";
    document.getElementById("quantityInput").value = "";
    document.getElementById("idText").value = "";
    document.getElementById("productName").value = "Product Name";
}

class SaleItem {
    constructor(productID, name, quantity, sellPrice, lineID) {
        this.productID = productID;
        this.name = name;
        this.quantity = quantity;
        this.sellPrice = quantity*sellPrice;
        this.lineID = lineID;
    }
}

class Sale {
    constructor(inventory) {
        this.productInventory = inventory;
        this.saleList = new Array();
        this.table = document.getElementById("saleTable");
        this.total = 0.0;
        this.maxID = 0;
    }

    // Adds a new item to the sale
    addItem(product) {
        if (document.getElementById("quantityInput").value <= 0) {
            return;
        }

        if (document.getElementById("quantityInput").value > product.quantity) {
            return;
        }

        for (let i = 0; i < this.saleList.length; i++) {
            if (this.saleList[i]["productID"] == product["productID"]) {
                this.modifyItem(this.saleList[i], product);
                return;
            }
        }

        let currentSaleItem = product.toSaleItem(document.getElementById("quantityInput").value, this.maxID);
        this.saleList.push(currentSaleItem);


        let saleRow = document.createElement("tr");
        saleRow.setAttribute("id", ("row" + this.maxID));

        let idElement = document.createElement("td");
        idElement.setAttribute("id", ("productID" + this.maxID));

        let nameElement = document.createElement("td");
        nameElement.setAttribute("id", ("productName" + this.maxID));

        let quantityElement = document.createElement("td");
        quantityElement.setAttribute("id", ("productQuantity" + this.maxID));

        let priceElement = document.createElement("td");
        priceElement.setAttribute("id", ("priceElement" + this.maxID));

        idElement.innerHTML = product["productID"];
        nameElement.innerHTML = product["name"];
        quantityElement.innerHTML = document.getElementById("quantityInput").value + " " + product["units"];
        var round = Math.round((100*product["sellPrice"] * document.getElementById("quantityInput").value));
        priceElement.innerHTML = "€ " + round/100;

        saleRow.append(idElement);
        saleRow.append(nameElement);
        saleRow.append(quantityElement);
        saleRow.append(priceElement);
        
        saleRow.onclick = function() {
            saleButtonFunction(product);
        }

        this.table.append(saleRow)
        this.maxID++;
        this.updateTotal();
        resetForm();
    }

    // Removes an item from the sale
    removeItem(){
        let productID = document.getElementById("idText").value;
        for(var i = 0; i < this.saleList.length; i++) {
            if(this.saleList[i]["productID"] == productID) {
                document.getElementById("row" + this.saleList[i]["lineID"]).remove();
                this.saleList.splice(i, 1);
                this.updateTotal();
                resetForm();
                break;
            }
        }
    }

    // Changes the amount of the given item to the new amount
    modifyItem(saleItem, product) {
        saleItem["sellPrice"] = product["sellPrice"] * document.getElementById("quantityInput").value;
        saleItem["quantity"] = document.getElementById("quantityInput").value;
        document.getElementById("productQuantity" + saleItem["lineID"]).innerHTML = saleItem["quantity"] + " " + product["units"];
        document.getElementById("priceElement" + saleItem["lineID"]).innerHTML = "€ " +  saleItem["sellPrice"];
        this.updateTotal();
        resetForm();
    }

    // Completes the sale and updates other systems as if the customer just paid for the goods
    finishSale(){
        window.location.reload();
    }

    updateTotal(){
        this.total = 0.0;
        for(var i = 0; i < this.saleList.length; i++) {
            this.total += (Math.round(100*this.saleList[i]["sellPrice"])/100);
        }
        document.getElementById("totalPrice").value = "Total: €" + this.total;
    }

    updatePrice(){
        let productID = document.getElementById("idText").value;
        for(var i = 0; i < this.productInventory.productList.length; i++) {
            if(this.productInventory.productList[i]["productID"] == productID) {
                var round = Math.round(100*this.productInventory.productList[i].sellPrice * document.getElementById("quantityInput").value);
                document.getElementById("productTotal").value = "€ " + round/100;
                break;
            }
        }
    }

    updateItemName(){
        let productID = document.getElementById("idText").value;
        for(var i = 0; i < this.productInventory.productList.length; i++) {
            if(this.productInventory.productList[i]["productID"] == productID) {
                document.getElementById("productName").value = this.productInventory.productList[i].name;
                break;
            }
        }
    }

    // Updates other systems after a sale
    updateOtherSystems(soldItem) { // ************* Needs to connect to other systems ****************
        // soldItem is a saleItem object
    }

    addItemButton() {
        let targetID = document.getElementById("idText").value;
        for (let i = 0; i < this.productInventory.numberOfElements; i++) {
            if (this.productInventory.productList[i]["productID"] == targetID) {
                this.addItem(this.productInventory.productList[i]);
                break;
            }
        }
    }    
}

function main() {
    var testInventory = new CurrentInventory();
    let testSale = new Sale(testInventory);
    let header = document.getElementById("feed");
    let stringy = "";

    testSale.productList[0].decrement(4.0);

    testSale.addItem("Apple",3);
    testSale.addItem("Yam",3);

    testSale.saleList.forEach(element => {
        stringy += element["name"];
    });

    header.innerHTML = stringy;
}

window.addEventListener('load', transactionOnload);