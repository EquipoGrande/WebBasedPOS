const salesReportQuery = "SELECT productName, sum(quantity) as amountSold, sum(quantity*sellprice) as revenue, "
    + "sum(quantity*purchaseprice) as cost, sum(quantity*(sellprice-purchaseprice)) as profit " 
    + "FROM Product p, salelineitem s WHERE s.productID = p.productID AND s.saleID BETWEEN $1 AND $2 "
    + "GROUP BY p.productName;";

const dateRangeQuery = "SELECT MIN(saleID), MAX(saleID) FROM saleHistory WHERE saleDate BETWEEN $1 AND $2;"

const restockReportQuery =  "SELECT productName,  stockquantity, amountSold, revenue FROM ("
    + "SELECT productName, stockquantity, sum(quantity) as amountSold, sum(quantity*sellprice) as revenue " 
    + "FROM Product p, currentinventory c, salelineitem s "
    + "WHERE s.productID = p.productID AND c.productID = p.productID AND s.saleID BETWEEN $1 AND $2 "
    + " GROUP BY p.productName, stockQuantity"
    + ") AS SalesReport WHERE amountSold > stockQuantity;"

var idRange;

//
async function getIDs(start, end, db) {
    startDate = Date.parse(start);
    endDate = Date.parse(end);
    idRange = await db.query(dateRangeQuery, [start, end])
        .then(result => result.rows[0])
        .catch(err => {
            console.log(err.message);
        });
}

module.exports = function (express) {
    var router = express.Router();

    var db = require('../Database');

    router.get('/salesReport', async (req, res) => {
        let dateRange = req.body;
        await getIDs(dateRange[0], dateRange[1], db).then();

        db.query(salesReportQuery, [idRange.min, idRange.max])
        .then(queryResult => {
            res.status(200);
            console.log(queryResult.rows);
            res.send(queryResult.rows);
        })
        .catch(err => {
            res.status(500);
            console.log(err.message);
            res.send(err.message);
        })
    })

    router.get('/restockReport', async (req, res) => {
        let dateRange = req.body;
        await getIDs(dateRange[0], dateRange[1], db).then();

        db.query(restockReportQuery, [idRange.min, idRange.max])
        .then(queryResult => {
            res.status(200);
            console.log(queryResult.rows);
            res.send(queryResult.rows);
        })
        .catch(err => {
            res.status(500);
            console.log(err.message);
            res.send(err.message);
        })
    })


    return router;
};
