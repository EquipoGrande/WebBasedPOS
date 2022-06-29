var table;
var htmlTable;
var startDate;
var endDate;

async function performOnload() {
    document.getElementById("productIDInput").onchange = function () { performOnload(); };
    document.getElementById("currentInventory").onchange = function () { performOnload(); };
    document.getElementById("vendorStartDate").onchange = function () { dateCheck(); };
    document.getElementById("vendorEndDate").onchange = function () { dateCheck(); };
    htmlTable = document.getElementById("vendorTable");
    document.getElementById("vendorTable").innerHTML = "";
    table = await generateTable();
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
    limitTable();
}

function dateCheck() {
    startDate = new Date(document.getElementById("vendorStartDate").value);
    endDate = new Date(document.getElementById("vendorEndDate").value);
    if(startDate != null && endDate != null) {
        performOnload();
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
    sortTable(tableArray);
    return tableArray;
}

function limitTable() {
    for(let i = 0; i < htmlTable.rows.length; i++) {
        if((document.getElementById("productIDInput").value.length > 0 && htmlTable.rows[i].cells[1].innerHTML != document.getElementById("productIDInput").value) ||
        (document.getElementById("currentInventory").value.length > 0 && htmlTable.rows[i].cells[2].innerHTML != document.getElementById("currentInventory").value) ||
        (startDate-86400000 > new Date(htmlTable.rows[i].cells[0].innerHTML) || endDate < new Date(htmlTable.rows[i].cells[0].innerHTML))) {
            htmlTable.rows[i].remove();
            i--;
        }
    }
    if(htmlTable.rows.length == 0) {
        htmlTable.innerHTML = "No matching data could be found";
    }
}

function sortTable(table) {
    for(let i = 0; i < table.length-1; i++) {
        for(let j = i+1; j < table.length; j++) {
            if(table[i][0] > table[j][0] || table[i][0] == table[j][0] && table[i][2] > table[j][2]) {
                let hold = table[i];
                table[i] = table[j];
                table[j] = hold;
            }
        }
    }
}

window.addEventListener('load', performOnload);