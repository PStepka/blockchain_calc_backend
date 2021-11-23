var express = require('express');
var router = express.Router();
const Web3 = require('web3');
const bodyParser = require("body-parser");

const infuraKey = process.env.INFURA_KEY || null;
const rinkebyWallet = process.env.RINKEBY_WALLET_ADDRESS || null;

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());
router.post('/calculate', calculate);

async function calculate(req, res) {
  const a = parseInt(req.body.firstOperand);
  const b =  parseInt(req.body.secondOperand);

  const sum = await getSum(a, b);

  // res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(sum.toString());
}

async function getSum(a, b) {

  const web3 = new Web3(new Web3.providers.HttpProvider( `https://rinkeby.infura.io/v3/${infuraKey}`));
  const helloWorld = new web3.eth.Contract([
    {
      "inputs": [
        {
          "internalType": "int256",
          "name": "a",
          "type": "int256"
        },
        {
          "internalType": "int256",
          "name": "b",
          "type": "int256"
        }
      ],
      "name": "getsum",
      "outputs": [
        {
          "internalType": "int256",
          "name": "",
          "type": "int256"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    }
  ], '0xe7c923A3faDd0B47458ec823bE3C291930D1D597');

  const pr = new Promise((resolve, reject) => {
    helloWorld.methods.getsum(a, b).call({from: rinkebyWallet}, function(error, result) {
      console.log(result);
      resolve(result);
      //return result;
    });
  });

  return await pr;
}

module.exports = router;


//const infuraKey = "be6c45e09ed54abfbc60d0f18b0a080c"// process.env.INFURA_KEY;


