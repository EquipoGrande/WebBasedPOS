class Product {
    constructor(productID, name, price, quantity) {
        this.productID = productID;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    decrement (amount) {
        this.quantity -= amount;
    }

    toSaleItem () {
        return new SaleItem(this.productID, this.name, this.quantity, this.price);
    }
}

class CurrentInventory {
    constructor(){
        this.numberOfElements = 23;
        this.productList = [new Product(0, "Apple",3.00,5.00), new Product(1, "Orange",3.00,5.00), new Product(2, "Banana",3.00,5.00), 
            new Product(3, "Pear",3.00,5.00), new Product(4, "Grape Fruit",3.00,5.00), new Product(5, "Fuji Apple",3.00,5.00),
            new Product(6, "Honey Crisp Apple",3.00,5.00), new Product(7,"Yams",3.00,5.00), new Product(8, "White Grapes",3.00,5.00),
            new Product(9, "Raspberry",3.00,5.00), new Product(10, "Black Berry",3.00,5.00), new Product(11, "Cherry",3.00,5.00),
            new Product(12, "Strawberry",3.00,5.00), new Product(13, "Potato",3.00,5.00), new Product(14, "Carrot",3.00,5.00),
            new Product(15, "Tomato",3.00,5.00), new Product(16, "Cucumber",3.00,5.00), new Product(17, "Radish",3.00,5.00),
            new Product(18, "Cherry Tomato",3.00,5.00), new Product(19, "Jalapeno",3.00,5.00), new Product(20, "Melon",3.00,5.00), 
            new Product(21, "Avacado",3.00,5.00), new Product(22, "Bell Pepper", 3.0, 5.0)];
    } 
}