

async function performOnload() {
    htmlTable = document.getElementById("vendorTable");
    var table = await generateTable();
    console.log(table);
    for(let i = 0; i < table.length; i++) {
        var row = htmlTable.insertRow(i);
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        var cell3 = row.insertCell(3);
        var cell4 = row.insertCell(4);
        date = new Date(table[i][0]);
        cell0.innerHTML = date.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});
        cell1.innerHTML = table[i][1];
        cell2.innerHTML = table[i][2];
        cell3.innerHTML = table[i][3];
        cell4.innerHTML = table[i][4];
    }
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