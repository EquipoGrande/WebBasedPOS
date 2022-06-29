const { response } = require("express");
const sales = require("../controllers/sales");

function onloadTrends() {
    
}

async function generateSalesReport() {
    salesReport = await fetchReport('http://localhost:3000/api/trends/salesReport').then(response => response.json());
    console.log(salesReport);

    if (salesReport.length == 0) {
        // implement error here
    }

    generateTable(salesReport, ["Product","Quantity Sold","Revenue", "Cost", "Profit"]);
}

async function generateRestockReport() {
    restockReport = await fetchReport('http://localhost:3000/api/trends/restockReport').then(response => response.json());
    console.log(salesReport);

    if (restockReport.length == 0) {
        // implement error here
    }

    generateTable(restockReport, ["Product", "Quantity in Stock", "Quantity Sold", "Revenue"]);
}

async function fetchReport(urlQuery) {
    startDate = document.getElementById("startDate").value;
    endDate = document.getElementById("endDate").value;

    if (startDate == null || endDate == null) {
        // implement error here
        return
    }

    return fetch(urlQuery + "?start=" + startDate + "&end=" + endDate, {method: 'GET'});
}

function generateTotal(report) {
    let total = 0.0;

    for (let i = 0; i < report.length; i++) {
        total += report[i]["revenue"];
    }
}

function generateTable(report, columnNames) {
    trendsTable = document.getElementById("trendTable");
    header = document.getElementById("tableHeader");

    let headerRow = document.createElement("tr");

    for (let i = 0; i < columnNames.length; i++) {
        let currentCol = document.createElement("td");
        currentCol.innerHTML = columnNames[i];
        headerRow.append(currentCol);
    }

    header.append(headerRow);

    for (let i = 0; i < report.length; i++) {
        let currentRow = document.createElement("tr");

        for (var dataName in report[i]) {
            let currentCol = document.createElement("td");
            currentCol.innerHTML = report[i][dataName];
            currentRow.append(currentCol);
        }

        trendsTable.append(currentRow)
    }
    
    let current
}

window.addEventListener('load', onloadTrends);