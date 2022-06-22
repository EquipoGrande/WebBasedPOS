class Product {
    // Each product is stored using 1 string, 2 floats, 2 integers, and 1 boolean in the following parameters
    constructor(name, id, sellPrice, purchasePrice, quantity, isKg) {
        this.name = name; // String
        this.sellPrice = sellPrice; // Float
        this.purchasePrice = purchasePrice; // Float
        this.quantity = quantity; // Integer
        this.id = id; // Integer
        this.isKg = isKg; // Boolean (True == kg, False == separately packaged)
    }

    decrement (amount) {
        this.quantity -= amount;
    }
}

class CurrentInventory {
    constructor(){
        this.numberOfElements = 31;
        this.productList = [new Product("Apple",3.00,5.00), new Product("Orange",3.00,5.00), new Product("Banana",3.00,5.00), 
            new Product("Pear",3.00,5.00), new Product("Grape Fruit",3.00,5.00), new Product("Fuji Apple",3.00,5.00),
            new Product("Honey Crisp Apple",3.00,5.00), new Product("Yams",3.00,5.00), new Product("White Grapes",3.00,5.00),
            new Product("Raspberry",3.00,5.00), new Product("Black Berry",3.00,5.00), new Product("Cherry",3.00,5.00),
            new Product("Strawberry",3.00,5.00), new Product("Potato",3.00,5.00), new Product("Carrot",3.00,5.00),
            new Product("Tomato",3.00,5.00), new Product("Cucumber",3.00,5.00), new Product("Radish",3.00,5.00),
            new Product("Cherry Tomato",3.00,5.00), new Product("Jalapeno",3.00,5.00), new Product("Melon",3.00,5.00), 
            new Product("Alligator",3.00,5.00), new Product("Pizza",3.00,5.00), new Product("Burger",3.00,5.00), 
            new Product("Noodles",3.00,5.00), new Product("Pasta",3.00,5.00), new Product("Bread",3.00,5.00), 
            new Product("Salsa",3.00,5.00), new Product("Chips",3.00,5.00), new Product("Avacado",3.00,5.00), new Product("Bell Pepper", 3.0, 5.0)];
    } 
}