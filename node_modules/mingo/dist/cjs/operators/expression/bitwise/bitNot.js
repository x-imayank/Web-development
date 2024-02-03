"use strict";
// Bitwise Operators: https://www.mongodb.com/docs/manual/reference/operator/aggregation/bitNot/#mongodb-expression-exp
Object.defineProperty(exports, "__esModule", { value: true });
exports.$bitNot = void 0;
const core_1 = require("../../../core");
const util_1 = require("../../../util");
/**
 * Returns the result of a bitwise not operation on a single argument or an array that contains a single int or long value.
 *
 * @param obj RawObject from collection
 * @param expr Right hand side expression of operator
 * @returns {Number}
 */
const $bitNot = (obj, expr, options) => {
    const n = (0, core_1.computeValue)(obj, expr, null, options);
    if ((0, util_1.isNil)(n))
        return null;
    if ((0, util_1.isNumber)(n))
        return ~n;
    throw new Error("$bitNot: expression must evaluate to a number.");
};
exports.$bitNot = $bitNot;
