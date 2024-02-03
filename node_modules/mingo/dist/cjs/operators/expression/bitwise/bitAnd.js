"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$bitAnd = void 0;
// Bitwise Operators: https://www.mongodb.com/docs/manual/reference/operator/aggregation/bitAnd/#mongodb-expression-exp
const _internal_1 = require("./_internal");
/**
 * Returns the result of a bitwise and operation on an array of int or long values.
 *
 * @param obj RawObject from collection
 * @param expr Right hand side expression of operator
 * @returns {Number}
 */
exports.$bitAnd = (0, _internal_1.bitwise)("$bitAnd", nums => nums.reduce((a, b) => a & b, -1));
