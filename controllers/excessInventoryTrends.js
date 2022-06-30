
const query_SaleIDRange = `SELECT MIN(saleID) as minSaleID, MAX(saleID) as maxSaleID FROM saleHistory WHERE saleDate BETWEEN $1 AND $2;`;
const query_VendorIDRange = `SELECT MIN(saleID) as minSaleID, MAX(saleID) as maxSaleID FROM vendorHistory WHERE saleDate BETWEEN $1 AND $2;`;

// $1: start sale id, $2: end sale id, $3: start vendor id
const query_megaQuery = `SELECT * FROM (
    SELECT c.productid, p.productname, 
    (c.stockquantity + COALESCE(s.salequantity, 0) - COALESCE(v.salequantity, 0)) as stockOnDate, 
    sl.amountsold, ((sl.amountsold / (c.stockquantity + COALESCE(s.salequantity, 0) - COALESCE(v.salequantity, 0))) * 100) AS percentSold 
    FROM currentinventory c 
    LEFT JOIN(SELECT sli.productid, sum(sli.quantity) as salequantity FROM salelineitem sli WHERE sli.saleid >= $1 GROUP BY sli.productid) AS s ON c.productid = s.productid 
    LEFT JOIN(SELECT vli.productid, sum(vli.quantity) as salequantity FROM vendorlineitem vli WHERE vli.saleid > $3 GROUP BY vli.productid) AS v ON c.productid = v.productid 
    LEFT JOIN(SELECT pr.productid, pr.productname FROM product pr) AS p ON c.productid = p.productid
    LEFT JOIN(SELECT sli.productid, sum(sli.quantity) as amountSold FROM salelineitem sli WHERE sli.saleid BETWEEN $1 AND $2 GROUP BY sli.productid) AS sl ON c.productid = sl.productid
    ORDER BY c.productid
    ) AS data WHERE percentSold <= 10;`;

module.exports = function (express) {
    var router = express.Router();

    var db = require('../Database');

    /**
     * Returns list of products that have sold less than 10% of their inventory during the specified
     * period
     */
    router.get('/excessInventoryReport', async (req, res) => {

        let success = true;

        // Get the sale and vendor id ranges
        let custSaleIDRange = {}, vendSaleIDRange = {};

        startDate = req.query.start;
        endDate = req.query.end;

        custSaleIDRange = await db.query(query_SaleIDRange, [startDate, endDate])
        .then(result => result.rows[0])
        .catch(err => {
            console.log(err.message);
            res.status = 500;
            res.send(err.message);
            success = false;
        });

        if(!success) return;

        vendSaleIDRange = await db.query(query_VendorIDRange, [startDate, endDate])
        .then(result => result.rows[0])
        .catch(err => {
            console.log(err.message);
            res.status = 500;
            res.send(err.message);
            success = false;
        });

        if(!success) return;

        // Execute mega query
        queryResult = await db.query(query_megaQuery, [custSaleIDRange.minsaleid, custSaleIDRange.maxsaleid, vendSaleIDRange.minsaleid])
        .then(result => result.rows)
        .catch(err => {
            console.log(err.message);
            res.status = 500;
            res.send(err.message);
            success = false;
        });
        
        if(!success) return;

        res.status(200);
        res.send(queryResult);
    });

    return router;
}