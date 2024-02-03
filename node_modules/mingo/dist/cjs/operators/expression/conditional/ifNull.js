"use strict";
/**
 * Conditional Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#conditional-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ifNull = void 0;
const core_1 = require("../../../core");
const util_1 = require("../../../util");
/**
 * Evaluates an expression and returns the first non-null value.
 *
 * @param obj
 * @param expr
 * @returns {*}
 */
const $ifNull = (obj, expr, options) => {
    const args = (0, core_1.computeValue)(obj, expr, null, options);
    return args.find(arg => !(0, util_1.isNil)(arg));
};
exports.$ifNull = $ifNull;
