var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET home page. */
router.get('/', async (req, res, next) => {
  const response = await axios.get('https://catfact.ninja/fact');
  res.render('index', { 
    title: 'Meeting Application Project', 
    cat_fact: `${response.data.fact}`
  });
});


module.exports = router;
