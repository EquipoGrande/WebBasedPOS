async function transactionOnload() {
    await onloadInitialize(function(currentProduct){
        saleButtonFunction(currentProduct);
    }).then();
    newSale = new Sale(productList);
    document.getElementById("sellLine").onclick = function () { newSale.addItemButton() };
    document.getElementById("removeLine").onclick = function () { newSale.removeItem() };
    document.getElementById("quantityInput").onchange = function () { newSale.updatePrice() };
    document.getElementById("idText").onchange = function () { newSale.updateItemName() };
    resetForm();
    document.getElementById("totalPrice").value = "";
}

function resetForm() {
    document.getElementById("productTotal").value = "€ 0.00";
    document.getElementById("quantityInput").value = "";
    document.getElementById("idText").value = "";
    document.getElementById("productName").value = "Product Name";
    document.getElementById("productAmount").value = "Amount left in Stock";
}

class SaleItem {
    constructor(productID, name, quantity, sellprice, lineID) {
        this.productID = productID;
        this.name = name;
        this.quantity = quantity;
        this.sellprice = quantity * sellprice;
        this.lineID = lineID;
    }
}

class Sale {
    constructor(inventory) {
        this.productList = inventory;
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

        //if (document.getElementById("quantityInput").value > product.quantity) {
        //    return;
        //}

        for (let i = 0; i < this.saleList.length; i++) {
            if (this.saleList[i]["productID"] == product["productid"]) {
                this.modifyItem(this.saleList[i], product);
                return;
            }
        }

        let currentSaleItem = new SaleItem(product.productid, product.productname, document.getElementById("quantityInput").value,
        product.sellprice*document.getElementById("quantityInput").value, this.maxID);

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

        idElement.innerHTML = product["productid"];
        nameElement.innerHTML = product["productname"];

        var unitType = " kg";
        if (product.sellunit == 0) {
            unitType = " bags";
        }

        quantityElement.innerHTML = document.getElementById("quantityInput").value + " " + unitType;
        var round = Math.round((100 * product["sellprice"] * document.getElementById("quantityInput").value));
        priceElement.innerHTML = "€ " + round / 100;

        saleRow.append(idElement);
        saleRow.append(nameElement);
        saleRow.append(quantityElement);
        saleRow.append(priceElement);

        saleRow.onclick = function () {
            saleButtonFunction(product);
        }

        this.table.append(saleRow)
        this.maxID++;
        this.updateTotal();
        resetForm();
    }

    // Removes an item from the sale
    removeItem() {
        let productID = document.getElementById("idText").value;
        for (var i = 0; i < this.saleList.length; i++) {
            if (this.saleList[i]["productID"] == productID) {
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
        saleItem["sellprice"] = product["sellprice"] * document.getElementById("quantityInput").value;
        saleItem["quantity"] = document.getElementById("quantityInput").value;
        
        var unitType = " kg";
        if (product.sellunit == 0) {
            unitType = " bags";
        }

        document.getElementById("productQuantity" + saleItem["lineID"]).innerHTML = saleItem["quantity"] + " " + unitType;
        document.getElementById("priceElement" + saleItem["lineID"]).innerHTML = "€ " + saleItem["sellprice"];
        this.updateTotal();
        resetForm();
    }

    // Completes the sale and updates other systems as if the customer just paid for the goods
    async finishSale() {
        const response = await fetch('http://localhost:3000/api/sales/makesale', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.saleList)
        });
    }

    sendSaleLine() {

    }

    updateTotal() {
        this.total = 0.0;
        for (var i = 0; i < this.saleList.length; i++) {
            this.total += (Math.round(100 * this.saleList[i]["sellprice"]) / 100);
        }
        document.getElementById("totalPrice").value = "Total: €" + this.total;
    }

    updatePrice() {
        let productID = document.getElementById("idText").value;
        console.log(this.productList);
        for (var i = 0; i < this.productList.length; i++) {
            if (this.productList[i]["productid"] == productID) {
                var round = Math.round(100 * this.productList[i].sellprice * document.getElementById("quantityInput").value);
                document.getElementById("productTotal").value = "€ " + round / 100;
                break;
            }
        }
    }

    updateItemName() {
        let productID = document.getElementById("idText").value;
        for (var i = 0; i < this.productList.length; i++) {
            if (this.productList[i]["productid"] == productID) {
                document.getElementById("productName").value = this.productList[i].productname;
                //document.getElementById("productAmount").value = this.productList[i].quantity + " " + this.productList[i].units;
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
        for (let i = 0; i < this.productList.length; i++) {
            if (this.productList[i]["productid"] == targetID) {
                console.log("here");
                this.addItem(this.productList[i]);
                break;
            }
        }
    }
}

window.addEventListener('load', transactionOnload);