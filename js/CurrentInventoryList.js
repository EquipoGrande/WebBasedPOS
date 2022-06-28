class Product {
    // Each product is stored using 1 string, 2 floats, 2 integers, and 1 boolean in the following parameters
    constructor(id, name, sellPrice, purchasePrice, quantity, units) {
        this.name = name; // String
        this.sellPrice = sellPrice; // Float
        this.purchasePrice = purchasePrice; // Float*
        this.quantity = quantity; // Integer
        this.productID = id; // Integer
        this.units = units; // String
    }

    decrement (amount) {
        this.quantity -= amount;
    }

    toSaleItem (quantitySold, id) {
        return new SaleItem(this.productID, this.name, quantitySold, this.sellPrice, id);
    }
}

function generateInventory() {
    fetch('http://localhost:3000/api/products/getproductslist')
        .then(res=>res.text())
            .then(res => function(res){return res});
}

/*
class CurrentInventory {
    constructor(){
        this.numberOfElements = 0;  

        fetch('http://localhost:3000/api/products/getproductslist')
            .then(res=>res.text())
                .then(res => function(res){this.productList = res;});

        console.log(this.productList[0].productname);

        /*
        var promise = new Promise(function(resolve, reject){
            var getRequest = new XMLHttpRequest();
            getRequest.responseType = "json";
            getRequest.open('GET', 'http://localhost:3000/api/products/getproductslist');
            getRequest.onload = function () {
                if (getRequest.status == 200) {
                    resolve(getRequest.response);
                } else {
                    reject(Error(getRequest.statusText));
                };
                getRequest.onerror = function() {
                    reject(Error('Cannot find JSON data'));
                }
            }
            getRequest.send();
        });

        var string = "";

        promise.then(function(data){
            string = data[0].productname;
        }, function(error) {
            console.log(error)
        });

        */

        /*
        this.productList = [new Product(0, "Apple",2.00,1.23,20.0,"Kg"), new Product(1, "Orange",4.20,3.50,20.0,"Kg"), new Product(2, "Banana",3.00,1.00,20.0,"Kg"), 
            new Product(3, "Pear",3.00,1.00,20.0,"Kg"), new Product(4, "Grape Fruit",3.00,4.00,20.0,"Kg"), new Product(5, "Fuji Apple",3.00,1.00,20.0,"Kg"),
            new Product(6, "Honey Crisp Apple",3.00,1.00,20.0,"Kg"), new Product(7,"Yams",2.00,1.00,20.0,"Kg"), new Product(8, "White Grapes",3.00,1.00,20.0,"Kg"),
            new Product(9, "Raspberry",3.00,1.00,20.0,"Kg"), new Product(10, "Black Berry",3.10,1.00,20.0,"Kg"), new Product(11, "Cherry",3.00,1.00,20.0,"Kg"),
            new Product(12, "Strawberry",3.00,1.00,20.0,"Kg"), new Product(13, "Potato",3.00,1.01,20.0,"Kg"), new Product(14, "Carrot",3.00,1.00,20.0,"Kg"),
            new Product(15, "Tomato",3.00,1.00,20.0,"Kg"), new Product(16, "Cucumber",3.00,1.00,20.0,"Kg"), new Product(17, "Radish",3.00,1.00,20.0,"Kg"),
            new Product(18, "Cherry Tomato",3.00,1.00,20.0,"Kg"), new Product(19, "Jalapeno",3.00,1.00,20.0,"Kg"), new Product(20, "Melon",3.00,1.00,20.0,"Kg"), 
         
            new Product(21, "Avacado",3.00,1.00,20.0,"Kg"), new Product(22, "Bell Pepper", 3.00,1.00,20.0,"Kg")];
        */
    } 
}
*/

