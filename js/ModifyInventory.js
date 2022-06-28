async function performOnload() {
    await onloadInitialize(function(currentProduct){
        modifyInventoryFunction(currentProduct);
    }).then();
    inventor = new ModifyInventory(productList);
    document.getElementById("updateInventory").onclick = function () { inventor.modifyQuantity() };
    document.getElementById("idtext").value = "";
    document.getElementById("productName").value = "Name";
    document.getElementById("currentInventory").value = "";
}

class ModifyInventory {
    constructor(inventory) {
        this.productList = inventory;
    }

    async modifyQuantity() {
        var promise = new Promise(function(resolve, reject){
            var getRequest = new XMLHttpRequest();
            getRequest.responseType = "json";
            getRequest.open("PUT", "http://localhost:3000/api/inventory/setinventorybyid?productid=" + document.getElementById("idtext").value + "&newquantity=" + document.getElementById("currentInventory").value);
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
        var inventoryNum = await promise;
        return inventoryNum;
    }

    static async getInventoryOf(currentId){
        var promise = new Promise(function(resolve, reject){
            var getRequest = new XMLHttpRequest();
            getRequest.responseType = "json";
            getRequest.open('GET', 'http://localhost:3000/api/inventory/getinventorybyid?productid=' + currentId);
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
    []
        var inventoryNum = await promise;
        var endPoint = inventoryNum[0]["stockquantity"];
        return endPoint;
    }
}

window.addEventListener('load', performOnload);