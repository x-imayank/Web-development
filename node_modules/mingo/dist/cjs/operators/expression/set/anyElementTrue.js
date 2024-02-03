"use strict";
/**
 * Set Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#set-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$anyElementTrue = void 0;
const core_1 = require("../../../core");
const util_1 = require("../../../util");
/**
 * Returns true if any elements of a set evaluate to true, and false otherwise.
 * @param obj
 * @param expr
 */
const $anyElementTrue = (obj, expr, options) => {
    // mongodb nests the array expression in another
    const args = (0, core_1.computeValue)(obj, expr, null, options)[0];
    return args.some(v => (0, util_1.truthy)(v, options.useStrictMode));
};
exports.$anyElementTrue = $anyElementTrue;
