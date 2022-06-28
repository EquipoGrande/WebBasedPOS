async function performOnload() {
    await onloadInitialize(function(currentProduct){
        modifyInventoryFunction(currentProduct);
    }).then();
    inventor = new ModifyInventory(productList);
    document.getElementById("updateInventory").onclick = function () { inventor.modifyQuantityButton() };
    document.getElementById("idtext").value = "";
    document.getElementById("productName").value = "Name";
    document.getElementById("currentInventory").value = "";
}

class ModifyInventory {
    constructor(inventory) {
        this.productList = inventory;
        console.log(this.productList)
    }

    modifyQuantityButton(){
        let targetId = document.getElementById("idText").value;
        let newQuantity = document.getElementById("currentinventory").value;
        this.modifyQuantity(targetId,newQuantity);
    }

    modifyQuantity(itemId, newQuantity) {
        for(let i = 0; i < this.productList.length; i++) {
            if(itemId == productList[i].id) {
                productList[i].quantity = newQuantity;
                break;
            }
        }
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
        console.log(endPoint);
        return endPoint;
    }
}

window.addEventListener('load', performOnload);