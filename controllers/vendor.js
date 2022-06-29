const sqlGetVendorList = "SELECT * FROM vendorHistory;";
const sqlGetVendorProds = "SELECT * FROM vendorLineItem";
const sqlTableQuery = "SELECT saleDate, l.saleID, l.productID, Quantity,"
+ "sum(quantity*sellPrice) as SalePrice FROM vendorHistory h, vendorLineItem l, product p WHERE " 
+ " h.saleID = l.saleID AND p.productID = l.productID GROUP BY saleDate, l.SaleID, l.productID, Quantity;";

module.exports = function (express) {

    var router = express.Router();

    var db = require('../Database');

    router.get('/getvendortransactionlist', (req, res) => {
        db.query(sqlGetVendorList)
        .then(queryResult => {
            res.status(200);
            res.send(queryResult.rows);
        })
        .catch(err => {
            res.status(500);
            console.log(err.message);
            res.send(err.message);
        })
    });
    
    router.get('/getvendorproductlist', (req, res) => {
        db.query(sqlGetVendorProds)
        .then(queryResult => {
            res.status(200);
            res.send(queryResult.rows);
        })
        .catch(err => {
            res.status(500);
            console.log(err.message);
            res.send(err.message);
        })
    });

    router.get('/getvendortable', (req, res) => {
        db.query(sqlTableQuery)
        .then(queryResult => {
            res.status(200);
            res.send(queryResult.rows);
        })
        .catch(err => {
            res.status(500);
            console.log(err.message);
            res.send(err.message);
        })
    });

    return router;
};