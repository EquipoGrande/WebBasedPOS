const query_getUsernames = `SELECT * FROM userinformation;`;


module.exports = function (express) {
    var router = express.Router();

    var db = require('../Database');

    /**
     * Returns a list of the usernames in JSON format
     */
    router.get('/getUsers', (req, res) => {
        db.query(query_getUsernames)
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
