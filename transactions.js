class Product {
    constructor(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    decrement (amount) {
        this.quantity -= amount;
    }
}

class SaleItem {
    constructor(item, amount) {
        this.item = item;
        this.amount = amount;
    }
}

class Sale {
    constructor() {
        this.productList = [new Product("Apple",3.00,5.00), new Product("Orange",3.00,5.00), new Product("Banana",3.00,5.00), 
                new Product("Pear",3.00,5.00), new Product("Grape Fruit",3.00,5.00), new Product("Fuji Apple",3.00,5.00),
                new Product("Honey Crisp Apple",3.00,5.00), new Product("Yams",3.00,5.00), new Product("White Grapes",3.00,5.00),
                new Product("Raspberry",3.00,5.00), new Product("Black Berry",3.00,5.00), new Product("Cherry",3.00,5.00),
                new Product("Strawberry",3.00,5.00), new Product("Potato",3.00,5.00), new Product("Carrot",3.00,5.00),
                new Product("Tomato",3.00,5.00), new Product("Cucumber",3.00,5.00), new Product("Radish",3.00,5.00),
                new Product("Cherry Tomato",3.00,5.00), new Product("Jalapeno",3.00,5.00), new Product("Melon",3.00,5.00)];
        this.saleList = []
    }

    addItem(item, amount) {
        this.saleList.push(new SaleItem(item, amount));
    }
}

function main() {
    let testie = new Sale();
    let header = document.getElementById("feed");
    let stringy = "";
    testie.productList[0].decrement(4.0);

    testie.addItem("Apple",3);
    testie.addItem("Yam",3);

    testie.saleList.forEach(element => {
        stringy += element["item"];
    });

    header.innerHTML = stringy;
}