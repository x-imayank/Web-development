"use strict";
// Miscellaneous Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/rand/#mongodb-expression-exp.-rand
Object.defineProperty(exports, "__esModule", { value: true });
exports.$rand = void 0;
/**
 * Returns a random float between 0 and 1.
 *
 * @param {*} _obj The target object for this expression
 * @param {*} _expr The right-hand side of the operator
 * @param {Options} _options Options to use for operation
 */
const $rand = (_obj, _expr, _options) => Math.random();
exports.$rand = $rand;
