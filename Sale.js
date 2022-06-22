class SaleItem {
    constructor(productID, name, quantity, purchasePrice) {
        this.productID = productID;
        this.name = name;
        this.quantity = quantity;
        this.purchasePrice = quantity*purchasePrice;
    }
}

class Sale {
    constructor(inventory) {
        this.productInventory = inventory;
        this.saleList = [];
        this.table = document.getElementById("saleTable");
    }

    // Adds a new item to the sale
    addItem(product, quantity) {
        let currentSaleItem = product.toSaleItem(quantity);
        this.saleList.push(currentSaleItem);

        let saleRow = document.createElement("tr");

        let idElement = document.createElement("td");
        let nameElement = document.createElement("td");
        let quantityElement = document.createElement("td");
        let priceElement = document.createElement("td");

        idElement.innerHTML = product["productID"];
        nameElement.innerHTML = product["name"];
        quantityElement.innerHTML = document.getElementById("quantityInput").value;
        priceElement.innerHTML = document.getElementById("quantityInput").value * product["purchasePrice"];

        saleRow.append(idElement);
        saleRow.append(nameElement);
        saleRow.append(quantityElement);
        saleRow.append(priceElement);

        this.table.append(saleRow)
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
        for(var i = 0; i < this.saleList.length; i++){

            // Removes item from array
            saleList.shift();
        }
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