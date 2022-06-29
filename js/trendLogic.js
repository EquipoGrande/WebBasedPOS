const { response } = require("express");

function onloadTrends() {
    
}

async function generateSalesReport() {
    salesReport = await fetchReport('http://localhost:3000/api/trends/salesReport?start=').then(response => response.json());
    console.log(salesReport);
}

async function fetchReport(urlQuery) {
    startDate = document.getElementById("startDate").value;
    endDate = document.getElementById("endDate").value;

    if (startDate == null || endDate == null) {
        // implement error here
        return
    }

    return fetch(urlQuery + startDate + "&end=" + endDate, {method: 'GET'});
}

window.addEventListener('load', onloadTrends);