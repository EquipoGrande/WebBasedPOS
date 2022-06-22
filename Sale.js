class SaleItem {
    constructor(name, quantity) {
        this.name = name;
        this.quantity = quantity;
    }
}

class Sale {
    constructor(inventory) {
        this.productList = inventory.productList;
        this.saleList = [];
    }

    // Adds a new item to the sale
    addItem(item, amount) {
        this.saleList.push(new SaleItem(item, amount));
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
            // Updates the database?
            updateOtherSystems(saleList[i])

            // Removes item from array
            saleList.shift();
        }
    }

    // Updates other systems after a sale
    updateOtherSystems(soldItem) { // ************* Needs to connect to other systems ****************
        // soldItem is a saleItem object
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