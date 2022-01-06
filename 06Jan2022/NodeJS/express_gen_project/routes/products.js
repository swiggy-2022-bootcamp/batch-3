var express = require('express');
var router = express.Router();

/* GET products listing. */
router.get('/', function (req, res, next) {
    res.send('Response from  productsRouter');
});

module.exports = router;