

async function performOnload() {
    htmlTable = document.getElementById("saleTable");
    var table = await generateTable();
    htmlTable.append(table);
}

async function generateTable() {
    var promise = new Promise(function(resolve, reject){
        var getRequest = new XMLHttpRequest();
        getRequest.responseType = "json";
        getRequest.open('GET', 'http://localhost:3000/api/vendor/getvendortable');
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
    var apiResult = await promise;
    tableArray = new Array(apiResult.length);
    for(let i = 0; i < apiResult.length; i++) {
        tableArray[i] = [apiResult[i]["saledate"],apiResult[i]["saleid"],apiResult[i]["productid"],apiResult[i]["quantity"],(Math.round(apiResult[i]["saleprice"]*100))/100];
    }
    return tableArray;
}

window.addEventListener('load', performOnload);