import "./eip712.sol";
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.6.12 <0.9.0;

contract Calc is EIP712MetaTransaction("mycalc", "1") {
    int256 storedNumber;

    enum BinaryOperator {Sum, Subtract, Divide, Multiply}
    enum UnaryOperator {Invert, Sqrt}

    function getBinaryOperation(int256 first, int256 second, BinaryOperator op) public pure returns(int256) {
        if (op == BinaryOperator.Sum) {
            return first + second;
        } else if (op == BinaryOperator.Subtract) {
            return first - second;
        } else if (op == BinaryOperator.Divide) {
            return first / second;
        } else {
            return first * second;
        }
    }

    function getUnaryOperation(int256 first, UnaryOperator op) public pure returns(int256) {
        if (op == UnaryOperator.Invert) {
            return -first;
        } else {
            return sqrt(first);
        }
    }

    function sqrt(int256 x) public pure returns (int256 y) {
       require(x >= 0, "Number should not be negative");

       int256 z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }

    function store(int256 x) payable public {
        storedNumber = x;
    }

    function get() public view returns (int256) {
        return storedNumber;
    }
}
