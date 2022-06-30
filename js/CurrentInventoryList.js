async function generateInventory() {
    var promise = new Promise(function(resolve, reject){
        var getRequest = new XMLHttpRequest();
        getRequest.responseType = "json";
        getRequest.open('GET', 'http://localhost:3000/api/products/getproductslist');
        getRequest.onload = function () {
            if (getRequest.status == 200) {
                resolve(getRequest.response);
            } else {
                showAlert("alert-sucess", "Cannot find JSON data");
                reject(Error(getRequest.statusText));
            };
        }
        getRequest.onerror = function() {
            showAlert("alert-sucess", "Cannot find JSON data");
            reject(Error('Cannot find JSON data'));
        }
        getRequest.send();
    });

    inventorylist = await promise;
    return inventorylist;
}