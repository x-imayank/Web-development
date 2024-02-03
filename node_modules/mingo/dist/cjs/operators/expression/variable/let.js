"use strict";
/**
 * Variable Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#variable-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$let = void 0;
const core_1 = require("../../../core");
/**
 * Defines variables for use within the scope of a sub-expression and returns the result of the sub-expression.
 *
 * @param obj The target object for this expression
 * @param expr The right-hand side of the operator
 * @param options Options to use for this operattion
 * @returns {*}
 */
const $let = (obj, expr, options) => {
    // resolve vars
    const variables = {};
    for (const [key, val] of Object.entries(expr.vars)) {
        variables[key] = (0, core_1.computeValue)(obj, val, null, options);
    }
    return (0, core_1.computeValue)(obj, expr.in, null, core_1.ComputeOptions.init(options, obj, { variables }));
};
exports.$let = $let;
