"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$bitOr = void 0;
// Bitwise Operators: https://www.mongodb.com/docs/manual/reference/operator/aggregation/bitOr/#mongodb-expression-exp
const _internal_1 = require("./_internal");
/**
 * Returns the result of a bitwise or operation on an array of int or long values.
 *
 * @param obj RawObject from collection
 * @param expr Right hand side expression of operator
 * @returns {Number}
 */
exports.$bitOr = (0, _internal_1.bitwise)("$bitOr", nums => nums.reduce((a, b) => a | b, 0));
