var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");

const calc = require("../src/calc");

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());
router.post('/calculate', calc.calculate);
router.get('/get', calc.get);

module.exports = router;


