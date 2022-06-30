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

const productPairsQuery = "SELECT s.saleId, p.productName, p.productID FROM saleLineItem s, product p WHERE p.productID = s.productID AND s.saleID BETWEEN $1 AND $2 ORDER BY saleid,  productid;";

var idRange;

var pairList = new Array();

class ProductPair {
    constructor(src, des) {
        this.srcProduct = src;
        this.desProduct = des;
        this.matchCount = 1;
    }

    toReportable() {
        return {
            "Product": this.srcProduct.productname,
            "PairedProduct": this.desProduct.productname,
            "Matched": this.matchCount
        }
    }
}

class ProductPairList {
    constructor() {
        this.productPairList = new Array();
    }

    addPair(src, des) {
        for (let i = 0; i < this.productPairList.length; i++) {
            if (this.productPairList[i].srcProduct.productid == src.productid && this.productPairList[i].desProduct.productid == des.productid) {
                this.productPairList[i].matchCount++;
                return;
            }
        }
        this.productPairList.push(new ProductPair(src, des));
    }

    getBestPairs() {
        // make list of all > 2 occurences
        this.productPairList.sort((a,b) => (b.matchCount > a.matchCount) ? 1 : -1);
        
        var bestPairs = new Array();

        for(let i = 0; i < this.productPairList.length; i++) {
            if(this.productPairList[i].matchCount < 2) {
                return bestPairs;
            }
            bestPairs.push(this.productPairList[i].toReportable());
        }
        return bestPairs;
    }
}

//
async function getIDs(start, end, db) {
    startDate = Date.parse(start);
    endDate = Date.parse(end);
    idRange = await db.query(dateRangeQuery, [start, end])
        .then(result => result.rows[0])
        .catch(err => {
            throw TypeError(err.message);
        });
}

module.exports = function (express) {
    var router = express.Router();

    var db = require('../Database');

    router.get('/salesReport', async (req, res) => {
        await getIDs(req.query.start, req.query.end, db).then().catch(err => {
            res.status(500);
            console.log(err.message);
            res.send(err.message);
        });

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
        await getIDs(req.query.start, req.query.end, db).then();

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

    router.get('/productPairs', async (req, res) => {
        await getIDs(req.query.start, req.query.end, db).then();

        var productList = await db.query(productPairsQuery, [idRange.min, idRange.max])
        .then(result => result.rows)
        .catch(err => {
            res.status(500);
            console.log(err.message);
            res.send(err.message);
        });

        console.log(productList);
        productPairList = new ProductPairList();
        
        // Produces a new List for each saleID with only the products used in that Sale
        for (let i = idRange.min; i <= idRange.max; i++) {
            var newList = new Array();
            for(let j = 0; j < productList.length; j++) {
                if(productList[j]["saleid"] == i) {
                    newList.push(productList[j]);
                }
            }

            // Creates and updates objects for the products in each sale ID
            for(let j = 0; j < newList.length-1; j++) {
                for(let k = j+1; k < newList.length; k++) {
                    productPairList.addPair(newList[j], newList[k]);
                }
            }
        }

        console.log(productPairList);
        

        let bestPairs = productPairList.getBestPairs();
        console.log(bestPairs);
        console.log([idRange.min, idRange.max]);
        res.status(200);
        res.send(bestPairs);
    })


    return router;
};
