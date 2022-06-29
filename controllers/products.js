
const query_getproductslist = `SELECT * FROM product;`;
const query_getproductbyid = `SELECT * FROM product WHERE productid=$1`;
const query_insertproduct = `INSERT INTO product(productid, productname, sellprice, sellunit, purchaseprice, purchaseunit) VALUES($1, $2, $3, $4, $5, $6);`;
const query_getmaxproductid = `SELECT MAX(productid) AS max FROM product;`;
const query_deleteproduct = `DELETE FROM product WHERE productid=$1`;

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
        db.query(query_getproductslist)
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

    /**
     * Returns the product specified by the product id in JSON format
     */
     router.get('/getproductbyid', (req, res) => {
        db.query(query_getproductbyid, [req.query.productid]).then(queryResult => {
            res.status(200);
            res.send(queryResult.rows);
        })
        .catch(err => {
            res.status(500);
            console.log(err.message);
            res.send(err.message);
        });
    });

    /**
     * Adds a new product to the database. 
     * Does not take in a product id as it will be generated automatically.
     * Product should be supplied as json in the request body
     */
    router.post('/addproduct', async (req, res) => {
        var nextID = await getNextProductID(db);
        var params = [nextID, req.body.productname, req.body.sellprice, req.body.sellunit, req.body.purchaseprice, req.body.purchaseunit];
        for(const item of params) {
            console.log(item);
            if(typeof item === 'undefined') {
                res.status(400);
                res.send('Invalid input');
                return;
            }
        }
        console.log(params);
        db.query(query_insertproduct, params).then(queryResult => {
            res.status(201);
            res.send(req.body.productname + ' added successfully!');
        })
        .catch(err => {
            res.status(500);
            console.log(err.message);
            res.send(err.message);
        });
    });

    /**
     * 
     */
    router.put('/editproduct', (req, res) => {
        var productid;
        var sqlstring = 'UPDATE product SET ';
        for(key in req.body) {
            if(key == 'productid') {
                productid = req.body[key];
                continue;
            }
            console.log(`${key}: ${req.body[key]}`);
            sqlstring += `${key}='${req.body[key]}', `
        }
        sqlstring = sqlstring.slice(0, -2);
        sqlstring += ' WHERE productid=$1';

        console.log(sqlstring);

        db.query(sqlstring, [productid]).then(queryResult => {
            res.status(200);
            res.send(productid + ' updated');
        })
        .catch(err => {
            res.status(500);
            console.log(err.message);
            res.send(err.message);
        });
    })

    /**
     * Remove product specified by the product id.
     */
    router.delete('/removeproduct', (req, res) => {
        db.query(query_deleteproduct, [req.query.productid]).then(queryResult => {
            res.status(200);
            res.send(req.query.productid + ' deleted');
        })
        .catch(err => {
            res.status(500);
            console.log(err.message);
            res.send(err.message);
        });
    });

    return router;
};
