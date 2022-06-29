const sqlGetNextID = 'SELECT MAX(saleid) as max FROM salehistory;';
const sqlLineItem = "INSERT INTO salelineitem VALUES($1, $2, $3);";
const sqlHistoryEntry = "INSERT INTO salehistory VALUES($1, $2, $3);";
const sqlUpdateInventory = "UPDATE currentinventory SET stockQuantity = $1 WHERE productID = $2";
const sqlCheckInventory = "SELECT stockQuantity FROM currentinventory WHERE productID = $1";

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

        console.log(req.body);
        console.log(max_id);

        var saleList = req.body;

        var total = 0.0;
        var date = new Date();

        

        for (let i = 0; i < saleList.length; i++) {
            await db.query(sqlLineItem, [max_id, saleList[i].productID, saleList[i].quantity]);
           
        
            let currentInventory = await db.query(sqlCheckInventory, [saleList[i].productID]).then(result => result.rows[0].stockquantity);
            var updateInventory =  parseFloat(currentInventory) - parseFloat(saleList[i].quantity);

            if (updateInventory < 0) {
                updateInventory = 0.0;
            }

            await db.query(sqlUpdateInventory, [parseFloat(updateInventory), saleList[i].productID]);

            total = total + parseFloat(saleList[i].sellprice);
        }

        await db.query(sqlHistoryEntry, [max_id, date, total]);
        res.send();
    });
    return router;
};
