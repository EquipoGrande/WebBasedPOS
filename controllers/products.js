
const query_getproductslist = `SELECT * FROM product;`;
const query_getproductbyid = `SELECT * FROM product WHERE productid=$1`;
const query_insertproduct = `INSERT INTO product(productid, productname, sellprice, sellunit, purchaseprice, purchaseunit) VALUES($1, $2, $3, $5, $4, $5);`;
const query_getmaxproductid = `SELECT MAX(productid) AS max FROM product;`;

async function getNextProductID(db) {
    var nextID;
    nextID = await db.query(query_getmaxproductid)
        .then(queryResponse => queryResponse.rows[0].max)
        .catch(err => console.log(err.message));

    nextID += 1; // get the next product id. This also converts to an int because js
    return nextID;
}

module.exports = function (express) {
    var router = express.Router();

    var db = require('../Database');

    /**
     * Returns a list of all products in JSON format
     */
    router.get('/getproductslist', (req, res) => {
        db.query(query_getproductslist, (err, queryResult)=>{
            if (!err) {
            res.send(queryResult.rows)
            } else {
            console.log(err.message);
            }
        });
    });

    /**
     * Returns the product specified by the product id in JSON format
     */
     router.get('/getproductbyid', (req, res) => {
        db.query(query_getproductbyid, [req.query.productid], (err, queryResult) => {
            if(!err) {
                res.status(200);
                res.send(queryResult.rows);
            } else {
                res.status(500);
                console.log(err.message);
                res.send(err.message);
            }
        });
    });

    /**
     * Adds a new product to the database. Does not take in a product id. Will be generated automatically
     */
    router.post('/addproduct', async (req, res) => {
        var nextID = await getNextProductID(db);
        var params = [nextID, req.body.productname, req.body.sellprice, req.body.purchaseprice, req.body.unit];
        db.query(query_insertproduct, params, (err, queryResult) => {
            if(!err) {
                res.status(201);
                res.send(req.body.productname + ' added successfully!');
            } else {
                res.status(500);
                console.log(err.message);
                res.send(err.message);
            }
        });
    });

    return router;
};
