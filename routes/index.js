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
  const first = parseInt(req.body.firstOperand);
  const second =  parseInt(req.body.secondOperand);
  const operator =  parseInt(req.body.operator);

  try {
    const result = await getBinaryOperation(first, second, operator);
    res.send(result.toString());
  } catch (e) {
    res.send(e.message)
  }
}

async function getBinaryOperation(firstOperand, secondOperand, operator) {

  const web3 = new Web3(new Web3.providers.HttpProvider( `https://rinkeby.infura.io/v3/${infuraKey}`));
  const calcContract = new web3.eth.Contract([
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
        },
        {
          "internalType": "enum Calc.BinaryOperator",
          "name": "op",
          "type": "uint8"
        }
      ],
      "name": "getBinaryOperation",
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
  ], '0xB19B8Df2F04A191386F087a64eaa2f7374810304');

  const pr = new Promise((resolve, reject) => {
    calcContract.methods.getBinaryOperation(firstOperand, secondOperand, operator).call({from: rinkebyWallet}, function(error, result) {
      if (error) {
        reject(error);
      } else {
        console.log(result);
        resolve(result);
      }
    });
  });

  return await pr;
}

module.exports = router;


