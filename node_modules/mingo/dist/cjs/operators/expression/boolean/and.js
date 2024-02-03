"use strict";
// Boolean Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#boolean-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$and = void 0;
const core_1 = require("../../../core");
const util_1 = require("../../../util");
/**
 * Returns true only when all its expressions evaluate to true. Accepts any number of argument expressions.
 *
 * @param obj
 * @param expr
 * @returns {boolean}
 */
const $and = (obj, expr, options) => {
    const value = (0, core_1.computeValue)(obj, expr, null, options);
    return ((0, util_1.truthy)(value, options.useStrictMode) &&
        value.every(v => (0, util_1.truthy)(v, options.useStrictMode)));
};
exports.$and = $and;
