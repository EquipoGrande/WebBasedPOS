const sqlGetNextID = 'SELECT MAX(saleid) as max FROM salehistory;';

var max_id;

async function getSaleID(db) {
    max_id = await db.query(sqlGetNextID).then(result => result.rows[0].max);
    max_id++;
}

module.exports = function (express) {

    var router = express.Router();

    var db = require('../Database');

    router.post('/makesale', async (req, res) => {
        await getSaleID(db);

        console.log(max_id);

        var saleList = req.body;
        var sqlStatement;

        var total = 0.0;
        var date = Date.now();

        for (let i = 0; i < saleList.length; i++) {
            var sqlStatement = "INSERT INTO salelineitem VALUES('" + max_id + "', '" + saleList[i].productID + "', '" + saleList[i].quantity + "');";
            console.log(sqlStatement);
            total += saleList[i].saleprice;
        }
        /*
        var salelist = req.body;
        for (let i = 0; i < salelist.length; i++) {
            console.log(salelist[i].name);
        }
        */
        /*db.query('SELECT * FROM product',(err, queryResult)=>{
            if (!err) {
            res.send(queryResult.rows)
            } else {
            console.log(err.message);
            }
        });*/
    });

    return router;
};
