function transactionOnload() {
    onloadInitialize();
    testSale = new Sale(testInventory);
    document.getElementById("sellLine").onclick = function() {testSale.addItemButton()};
}

class SaleItem {
    constructor(productID, name, quantity, sellPrice, lineID) {
        this.productID = productID;
        this.name = name;
        this.quantity = quantity;
        this.sellPrice = quantity*sellPrice;
        this.lineID = this.lineID;
    }
}

class Sale {
    constructor(inventory) {
        this.productInventory = inventory;
        this.saleList = [];
        this.table = document.getElementById("saleTable");
        this.maxID = 0;
    }

    // Adds a new item to the sale
    addItem(product, quantity) {
        let currentSaleItem = product.toSaleItem(quantity, this.maxID);
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
        quantityElement.innerHTML = document.getElementById("quantityInput").value;
        priceElement.innerHTML = document.getElementById("quantityInput").value * product["sellPrice"];

        saleRow.append(idElement);
        saleRow.append(nameElement);
        saleRow.append(quantityElement);
        saleRow.append(priceElement);

        this.table.append(saleRow)
        this.maxID++;
    }

    // Removes an item from the sale
    removeItem(item){
        for(var i = 0; i < this.saleList.length; i++) {
            if(saleList[i] === item) {
                saleList.splice(i, 1);
            }
        }
    }

    // Changes the amount of the given item to the new amount
    modifyItem(item, amount) {
        removeItem(item);
        addItem(item, amount);
    }

    // Completes the sale and updates other systems as if the customer just paid for the goods
    finishSale(){
        document.getElementById("saleTable").innerHTML = "";
    }

    // Updates other systems after a sale
    updateOtherSystems(soldItem) { // ************* Needs to connect to other systems ****************
        // soldItem is a saleItem object
    }

    addItemButton() {
        let targetID = document.getElementById("idText").value;;
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