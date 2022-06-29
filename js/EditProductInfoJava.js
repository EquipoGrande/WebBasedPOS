async function performOnload() {
    await onloadInitialize(function(currentProduct) {
        editInventoryFunction(currentProduct);
    }).then();
    
    var productInfo = new ProductInfo(productList);
    document.getElementById('editProductBtn').onclick = function () {productInfo.EditProduct()};
    document.getElementById('insertProductBtn').onclick = function () {productInfo.InsertProduct()};
    document.getElementById('deleteProductBtn').onclick = function () {productInfo.DeleteProduct()};

}

class ProductInfo {
    constructor(inventory) {
        this.productList = inventory;
    }

    async EditProduct() {

        showAlert('alert-info', 'Attempting to edit product...');

        // Get info from page
        var productID = document.getElementById('productIDInput').value;
        var productName = document.getElementById('productName').value;
        var sellPrice = document.getElementById('sellPrice').value;
        var purchasePrice = document.getElementById('purchasePrice').value;
        var unit = document.getElementById('radioKgs').checked ? 1 : 0;

        // create the json object
        var product = {};
        product["productid"] = productID;
        product["productname"] = productName;
        product["sellprice"] = sellPrice;
        product["sellunit"] = unit;
        product["purchaseprice"] = purchasePrice;
        product["purchaseunit"] = unit;

        // var putRequest = new XMLHttpRequest();
        // putRequest.responseType = "json";
        // putRequest.open("PUT", "http://localhost:3000/api/products/editproduct");
        // putRequest.send(JSON.stringify(product));
        
        const response = await fetch('http://localhost:3000/api/products/editproduct', 
        {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
        const content = await response;
    }

    async InsertProduct() {

        showAlert('alert-info', 'Attempting to add product...');

        var productName = document.getElementById('productName').value;
        var sellPrice = document.getElementById('sellPrice').value;
        var purchasePrice = document.getElementById('purchasePrice').value;
        var unit = document.getElementById('radioKgs').checked ? 1 : 0;

        var product = {};
        product["productname"] = productName;
        product["sellprice"] = sellPrice;
        product["sellunit"] = unit;
        product["purchaseprice"] = purchasePrice;
        product["purchaseunit"] = unit;

        const response = await fetch('http://localhost:3000/api/products/addproduct', 
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });

        var responseBody = await response.json();

        if(response.status == 201) {
            showAlert('alert-success', 'Successfully Added Product');
            document.getElementById('productIDInput').value = responseBody.productid;
        } else {
            showAlert('alert-danger', 'Error Adding Product');
        }
    }

    async DeleteProduct() {

        if(!confirm('Are you sure you want to delete this product?')) {
            return;
        }

        showAlert('alert-info', 'Attempting to delete product...');

        var productID = document.getElementById('productIDInput').value;

        // TODO: add alert to make sure they want to
        const response = await fetch('http://localhost:3000/api/products/removeproduct?' + new URLSearchParams({
            productid: productID
        }),
        {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if(response.status == 200) {
            showAlert('alert-success', 'Successfully Removed Product');
            document.getElementById('editProductForm').reset();
        } else {
            showAlert('alert-danger', 'Error Removing Product');
        }

    }
}

window.addEventListener('load', performOnload);