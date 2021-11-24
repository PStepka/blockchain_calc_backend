// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 */
contract Calc {

    enum BinaryOperator {Sum, Subtract, Divide, Multiply}
    enum UnaryOperator {Invert, Sqrt}

    function getBinaryOperation(int256 a, int256 b, BinaryOperator op) public pure returns(int256) {
        if (op == BinaryOperator.Sum) {
            return a + b;
        } else if (op == BinaryOperator.Subtract) {
            return a - b;
        } else if (op == BinaryOperator.Divide) {
            return a / b;
        } else if (op == BinaryOperator.Multiply) {
            return a * b;
        }

        return -1;
    }

    function getUnaryOperation(int256 a, UnaryOperator op) public pure returns(int256) {
        if (op == UnaryOperator.Invert) {
            return -a;
        } else if (op == UnaryOperator.Sqrt) {
            return sqrt(a);
        }

        return -1;
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

}
