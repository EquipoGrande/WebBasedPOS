module.exports = function (express) {
    var router = express.Router();

    var db = require('../Database');

    /**
     * Returns a list of all products in JSON format
     */
    router.get('/getproductslist', (req, res) => {
        db.query('SELECT * FROM product',(err, queryResult)=>{
            if (!err) {
            res.send(queryResult.rows)
            } else {
            console.log(err.message);
            }
        });
    });

    router.get('/sellline', (req, res) => {
        db.query('SELECT * FROM product',(err, queryResult)=>{
            if (!err) {
            res.send(queryResult.rows)
            req.para
            } else {
            console.log(err.message);
            }
        });
    });
    /**
     * Returns the product specified by the product id in JSON format
     */
     router.get('/getproductbyid', (req, res) => {
        db.query('SELECT * FROM product WHERE productid=' + req.query.productid, (err, queryResult) => {
            if(!err) {
                res.send(queryResult.rows);
            } else {
                console.log(err.message);
            }
        });
    });

    return router;
};
