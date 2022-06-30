function onloadTrends() {
    
}

async function generateSalesReport() {
    salesReport = await fetchReport('http://localhost:3000/api/trends/salesReport').then(response => response.json());

    if (salesReport.length == 0) {
        showAlert("alert-danger", "Error: No data for requested period");
        return;
    }

    generateTable(salesReport, ["Product","Quantity Sold","Revenue", "Cost", "Profit"]);
    console.log(generateTotal(salesReport, "profit"));
    changeTableCaption('Sales Report');
}

async function generateRestockReport() {
    restockReport = await fetchReport('http://localhost:3000/api/trends/restockReport').then(response => response.json())
    .catch(error => {
        console.error('Error:', error);
      });

    if (restockReport.length == 0) {
        showAlert("alert-danger", "Error: No data for requested period");
        return;
    }

    generateTable(restockReport, ["Product", "Quantity in Stock", "Quantity Sold", "Revenue"]);
    changeTableCaption('Restock Report');
}

async function generateProductPairReport() {
    pairsReport = await fetchReport('http://localhost:3000/api/trends/productPairs').then(response => response.json())
    .catch(error => {
        console.error('Error:', error);
      });

    if (pairsReport.length == 0) {
        showAlert("alert-danger", "Error: No data for requested period");
        return;
    }

    generateTable(pairsReport, ["Product", "Paired Product", "Times Matched"]);
    changeTableCaption('Product Pairs Report');
}

async function generateExcessReport() {
    excessReport = await fetchReport('http://localhost:3000/api/trends/excessInventoryReport').then(response => response.json());
    if (excessReport.length == 0) {
        showAlert('alert-danger', 'Error: No Results in Excess Report');
        return;
    }

    generateTable(excessReport, ["Product ID", "Name", "Starting Stock", "Quantity Sold", "Percent Sold"]);
    changeTableCaption('Excess Report')
}

async function fetchReport(urlQuery) {
    startDate = document.getElementById("startDate").value;
    endDate = document.getElementById("endDate").value;

    if (startDate == "" || endDate == "") {
        showAlert("alert-danger", "Error: Please insert a valid date in each entry!");
        return {};
    } else {
        let response = await fetch(urlQuery + "?start=" + startDate + "&end=" + endDate, {method: 'GET'});
        if(response.status != 200) {
            showAlert('alert-danger', 'Error fetching request');
            return {};
        }
        return response;
    }
}

function changeTableCaption(text) {
    document.getElementById('tableCaption').innerHTML = text;
}

function generateTotal(report, propertyName) {
    let total = 0.0;

    for (let i = 0; i < report.length; i++) {
        total += report[i][propertyName];
    }
    
    return total;
}

function generateTable(report, columnNames) {
    trendsTable = document.getElementById("trendTable");
    header = document.getElementById("tableHeader");
    var euroColumns = new Array();
    var percentColumns = new Array();
    
    trendsTable.innerHTML = "";
    header.innerHTML = "";

    let headerRow = document.createElement("tr");

    for (let i = 0; i < columnNames.length; i++) {
        let currentCol = document.createElement("td");
        currentCol.innerHTML = columnNames[i];
        headerRow.append(currentCol);

        if(columnNames[i] == "Revenue" || columnNames[i] == "Cost" || columnNames[i] == "Profit") {
            euroColumns.push(i);
        }
        if(columnNames[i] == "Percent Sold") {
            percentColumns.push(i);
        }
    }

    header.append(headerRow);

    for (let i = 0; i < report.length; i++) {
        let currentRow = document.createElement("tr");

        var j = 0;
        for (var dataName in report[i]) {
            let currentCol = document.createElement("td");
            
            if(isFloat(report[i][dataName])) {
                currentCol.innerHTML = report[i][dataName].toFixed(2);
            } else {
                currentCol.innerHTML = report[i][dataName];
            }
            if(euroColumns.indexOf(j) != -1) {
                currentCol.innerHTML = "€ " + currentCol.innerHTML;
            }
            if(percentColumns.indexOf(j) != -1) {
                currentCol.innerHTML = currentCol.innerHTML + "%";
            }

            currentRow.append(currentCol);
            j++;
        }

        trendsTable.append(currentRow)
    }
}

function isFloat(value) {
    if (typeof value === 'number' &&
        !Number.isNaN(value) &&
        !Number.isInteger(value)
    ) {
        return true;
    }
    return false;
}

window.addEventListener('load', onloadTrends);