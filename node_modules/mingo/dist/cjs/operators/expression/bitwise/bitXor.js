"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$bitXor = void 0;
// Bitwise Operators: https://www.mongodb.com/docs/manual/reference/operator/aggregation/bitNot/#mongodb-expression-exp
const _internal_1 = require("./_internal");
/**
 * Returns the result of a bitwise xor (exclusive or) operation on an array of int and long values.
 *
 * @param obj RawObject from collection
 * @param expr Right hand side expression of operator
 * @returns {Number}
 */
exports.$bitXor = (0, _internal_1.bitwise)("$bitXor", nums => nums.reduce((a, b) => a ^ b, 0));
