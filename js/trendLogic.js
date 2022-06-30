var trendChart;

function onloadTrends() {
}

async function generateSalesReport() {
    salesReport = await fetchReport('http://localhost:3000/api/trends/salesReport').then(response => response.json());

    if (salesReport.length == 0) {
        showAlert("alert-danger", "Error: No data for requested period");
        return;
    }

    generateTable(salesReport, ["Product","Quantity Sold","Revenue", "Cost", "Profit"]);
    makeGraph(getTopReport(salesReport, ["profit"]));
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
    makeGraph(getTopRestock(restockReport));
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
    makeGraph(getTopPairs(pairsReport));
}

async function generateExcessReport() {
    excessReport = await fetchReport('http://localhost:3000/api/trends/excessInventoryReport').then(response => response.json());
    if (excessReport.length == 0) {
        showAlert('alert-danger', 'Error: No Results in Excess Report');
        return;
    }

    generateTable(excessReport, ["Product ID", "Name", "Starting Stock", "Quantity Sold", "Percent Sold"]);
    makeGraph(getTopReport(excessReport, ["percentsold"]));
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

function getTopReport(report, sortname) {
    report.sort((a,b) => (b[sortname] > a[sortname]) ? 1 : -1);

    let namelist = new Array();
    let statlist = new Array();

    for (let i = 0; (i < report.length && i < 10); i++) {
        namelist.push(report[i].productname);
        statlist.push(report[i][sortname]);
    }
    return {
        names: namelist,
        stats: statlist
    }
}

function getTopRestock(report) {
    let ratioList = new Array();

    for (let i = 0; (i < report.length && i < 10); i++) {
        let currentRatio = (report[i].stockquantity / report[i].amountsold);
        ratioList.push({
            name: report[i].productname,
            stat: currentRatio
        });
    }

    ratioList.sort((a,b) => (b.stat > a.stat) ? -1 : 1);

    let namelist = new Array();
    let statlist = new Array();

    for (let i = 0; (i < ratioList.length && i < 10); i++) {
        console.log(ratioList[i]);
        namelist.push(ratioList[i].name);
        statlist.push(ratioList[i].stat);
    }
    return {
        names: namelist,
        stats: statlist
    }
}

function getTopPairs(report) {
    let namelist = new Array();
    let statlist = new Array();

    for (let i = 0; (i < report.length && i < 10); i++) {
        namelist.push(report[i].Product + " with " + report[i].PairedProduct);
        statlist.push(report[i].Matched);
    }
    return {
        names: namelist,
        stats: statlist
    }
}

function makeGraph(reportLists) {

    if (trendChart != null) {
        trendChart.destroy();
    }

    var xValues = reportLists.names;
    var yValues = reportLists.stats;
    console.log(xValues);
    console.log(yValues);
    var barColors = "rgba(82,73,255,1.0)";

    trendChart = new Chart("myChart", {
    type: "bar",
    data: {
        labels: xValues,
        datasets: [{
        backgroundColor: barColors,
        data: yValues
        }]
    },
    options: {
        legend: {
           display: false
        },
        tooltips: {
           enabled: false
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
    });
}

function isFloat(value) {
    if(typeof value == 'number' && !Number.isNaN(value) && !Number.isInteger(value)) {
        return true;
    }
    return false;
}


