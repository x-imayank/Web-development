"use strict";
// Arithmetic Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#arithmetic-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ln = void 0;
const core_1 = require("../../../core");
const util_1 = require("../../../util");
/**
 * Calculates the natural logarithm ln (i.e loge) of a number and returns the result as a double.
 *
 * @param obj
 * @param expr
 * @returns {number}
 */
const $ln = (obj, expr, options) => {
    const n = (0, core_1.computeValue)(obj, expr, null, options);
    if ((0, util_1.isNil)(n))
        return null;
    (0, util_1.assert)((0, util_1.isNumber)(n) || isNaN(n), "$ln expression must resolve to a number.");
    return Math.log(n);
};
exports.$ln = $ln;
