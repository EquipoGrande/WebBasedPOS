module.exports = function (express) {
    var router = express.Router();

    var db = require('../Database');

    /**
     * Returns a list of all products in JSON format
     */
    router.get('/getinventorylist', (req, res) => {
        db.query('SELECT * FROM currentinventory ORDER BY productID ASC', (err, queryResult) => {
            if (!err) {
                res.status = 200;
                res.send(queryResult.rows)
            } else {
                res.status = 500;
                res.send(err.message);
                console.log(err.message);
            }
        });
    });

    router.put('/setinventorybyid', (req, res) => {
        db.query('UPDATE currentinventory SET stockQuantity = ' + req.query.newquantity + ' WHERE productID = ' + req.query.productid, (err, queryResult) => {
            if (!err) {
                res.status = 200;
                res.send(queryResult.rows);
            } else {
                res.status = 500;
                res.send(err.message);
                console.log(err.message);
            }
        });
    });

    router.get('/getunitsbyid', (req, res) => {
        db.query('SELECT * FROM product WHERE productID = ' + req.query.productid, (err, queryResult) => {
            if (!err) {
                res.status = 200;
                res.send(queryResult.rows);
            } else {
                res.status = 500;
                res.send(err.message);
                console.log(err.message);
            }
        })
    })

    router.get('/getinventorybyid', (req, res) => {
        db.query('SELECT stockQuantity FROM currentinventory WHERE productID = ' + req.query.productid, (err, queryResult) => {
            if (!err) {
                res.status = 200;
                res.send(queryResult.rows);
            } else {
                res.status = 500;
                re.send(err.message);
                console.log(err.message);
            }
        })
    })

    return router;
};
