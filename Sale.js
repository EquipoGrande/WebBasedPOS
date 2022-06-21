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

    addItem(item, amount) {
        this.saleList.push(new SaleItem(item, amount));
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