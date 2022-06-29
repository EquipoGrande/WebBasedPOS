const salesReportQuery = "SELECT productName, sum(quantity) as amountSold, sum(quantity*sellprice) as revenue, "
    + "sum(quantity*purchaseprice) as cost, sum(quantity*(sellprice-purchaseprice)) as profit " 
    + "FROM Product p, salelineitem s WHERE s.productID = p.productID AND s.saleID BETWEEN $1 AND $2 "
    + "GROUP BY p.productName;";



module.exports = function (express) {

    var router = express.Router();

    var db = require('../Database');


    return router;
};
