"use strict";
// Arithmetic Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#arithmetic-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$add = void 0;
const core_1 = require("../../../core");
const util_1 = require("../../../util");
/**
 * Computes the sum of an array of numbers.
 *
 * @param obj
 * @param expr
 * @returns {Object}
 */
const $add = (obj, expr, options) => {
    const args = (0, core_1.computeValue)(obj, expr, null, options);
    let foundDate = false;
    const result = args.reduce((acc, val) => {
        if ((0, util_1.isDate)(val)) {
            (0, util_1.assert)(!foundDate, "'$add' can only have one date value");
            foundDate = true;
            val = val.getTime();
        }
        // assume val is a number
        acc += val;
        return acc;
    }, 0);
    return foundDate ? new Date(result) : result;
};
exports.$add = $add;
