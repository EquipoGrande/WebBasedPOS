const query_getUserInfo = `SELECT * FROM userinformation;`;
const query_getManager = `SELECT * FROM userinformation WHERE role='Manager';`;
const query_getCashier = `SELECT * FROM userinformation WHERE role='Cashier';`;


module.exports = function (express) {
    var router = express.Router();

    var db = require('../Database');

    /**
     * Returns a list of the user information in JSON format
     */
    router.get('/getUsers', (req, res) => {
        db.query(query_getUserInfo)
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
