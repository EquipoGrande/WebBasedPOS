const salesReportQuery = "SELECT productName, sum(quantity) as amountSold, sum(quantity*sellprice) as revenue, "
    + "sum(quantity*purchaseprice) as cost, sum(quantity*(sellprice-purchaseprice)) as profit " 
    + "FROM Product p, salelineitem s WHERE s.productID = p.productID AND s.saleID BETWEEN $1 AND $2 "
    + "GROUP BY p.productName;";


const sqlGetRange = "SELECT MIN(saleID), MAX(saleID) FROM saleHistory WHERE saleDate BETWEEN $1 AND $2;";     
//
async function getIDs(start, end) {
    let idRange = await db.query(sqlGetRange).then(result => result.rows[0]);
    return idRange;
}

module.exports = function (express) {
    var router = express.Router();

    var db = require('../Database');

    router.get('/salesReport', async (req, res) => {)


    return router;
};
