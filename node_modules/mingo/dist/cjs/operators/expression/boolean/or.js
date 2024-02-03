"use strict";
// Boolean Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#boolean-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$or = void 0;
const core_1 = require("../../../core");
const util_1 = require("../../../util");
/**
 * Returns true when any of its expressions evaluates to true. Accepts any number of argument expressions.
 *
 * @param obj
 * @param expr
 * @returns {boolean}
 */
const $or = (obj, expr, options) => {
    const value = (0, core_1.computeValue)(obj, expr, null, options);
    const strict = options.useStrictMode;
    return (0, util_1.truthy)(value, strict) && value.some(v => (0, util_1.truthy)(v, strict));
};
exports.$or = $or;
