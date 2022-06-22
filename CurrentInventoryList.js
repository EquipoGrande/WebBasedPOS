class Product {
<<<<<<< HEAD
    constructor(productID, name, price, quantity) {
        this.productID = productID;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
=======
    // Each product is stored using 1 string, 2 floats, 2 integers, and 1 boolean in the following parameters
    constructor(name, id, sellPrice, purchasePrice, quantity, isKg) {
        this.name = name; // String
        this.sellPrice = sellPrice; // Float
        this.purchasePrice = purchasePrice; // Float
        this.quantity = quantity; // Integer
        this.id = id; // Integer
        this.isKg = isKg; // Boolean (True == kg, False == separately packaged)
>>>>>>> 239d951dd423ad7d1a50bfdffcf7fbc00e03b8de
    }

    decrement (amount) {
        this.quantity -= amount;
    }

    toSaleItem (quantitySold) {
        return new SaleItem(this.productID, this.name, quantitySold, this.price);
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