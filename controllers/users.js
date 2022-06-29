const query_getUserInfo = `SELECT * FROM userinformation;`;
module.exports = function (express) {
    var router = express.Router();

    var db = require('../Database');

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
