"use strict";
/**
 * String Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#string-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$strcasecmp = void 0;
const core_1 = require("../../../core");
const util_1 = require("../../../util");
/**
 * Compares two strings and returns an integer that reflects the comparison.
 *
 * @param obj
 * @param expr
 * @returns {number}
 */
const $strcasecmp = (obj, expr, options) => {
    const args = (0, core_1.computeValue)(obj, expr, null, options);
    let a = args[0];
    let b = args[1];
    if ((0, util_1.isEqual)(a, b) || args.every(util_1.isNil))
        return 0;
    (0, util_1.assert)(args.every(util_1.isString), "$strcasecmp must resolve to array(2) of strings");
    a = a.toUpperCase();
    b = b.toUpperCase();
    return (a > b && 1) || (a < b && -1) || 0;
};
exports.$strcasecmp = $strcasecmp;
