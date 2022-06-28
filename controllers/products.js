module.exports = function (express) {
    var router = express.Router();

    var db = require('../Database');
    //const router = require('../')();

    router.get('/getproductslist', (req, res) => {
        console.log("test")
        db.query('SELECT * FROM product',(err, queryResult)=>{
            if (!err) {
            res.send(queryResult.rows)
            } else {
            console.log(err.message);
            }
        });
    });

    return router;
};
