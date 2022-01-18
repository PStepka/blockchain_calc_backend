const Web3 = require('web3');

const infuraKey = process.env.INFURA_KEY || null;
const mumbaiWallet = process.env.MUMBAI_WALLET_ADDRESS || null;

const contract = require("../Contracts/calc.json");
const contract_address = process.env.CONTRACT_ADDRESS || null;

module.exports = {calculate, get}

async function calculate(req, res) {
    const first = req.body.firstOperand !== undefined ? parseInt(req.body.firstOperand): undefined;
    const second = req.body.secondOperand !== undefined ? parseInt(req.body.secondOperand): undefined;
    const operator =  parseInt(req.body.operator);

    try {
        const result = second !== undefined ? await getBinaryOperation(first, second, operator) :
            await getUnaryOperation(first, operator);
        res.send(result.toString());
    } catch (e) {
        res.statusMessage = e.message;
        res.status(400).end();
    }
}

async function getUnaryOperation(firstOperand, operator) {
    const calcContract = getContract();

    const pr = new Promise((resolve, reject) => {
        calcContract.methods.getUnaryOperation(firstOperand, operator).call({from: mumbaiWallet}, function(error, result) {
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

async function get(req, res) {
    try {
        const result = await getPromise();
        res.send(result.toString());
    } catch (e) {
        res.statusMessage = e.message;
        res.status(400).end();
    }
}

async function getPromise() {
    const calcContract = getContract();

    const pr = new Promise((resolve, reject) => {
        calcContract.methods.get().call({from: mumbaiWallet}, function(error, result) {
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

async function getBinaryOperation(firstOperand, secondOperand, operator) {
    const calcContract = getContract();

    const pr = new Promise((resolve, reject) => {
        calcContract.methods.getBinaryOperation(firstOperand, secondOperand, operator).call({from: mumbaiWallet}, function(error, result) {
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

function getContract() {
    const web3 = new Web3(new Web3.providers.WebsocketProvider( `${infuraKey}`));
    const calcContract = new web3.eth.Contract(contract.output.abi, contract_address, {from:mumbaiWallet});

    return calcContract;
}
