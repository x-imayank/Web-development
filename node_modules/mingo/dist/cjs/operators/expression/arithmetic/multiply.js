"use strict";
// Arithmetic Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#arithmetic-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$multiply = void 0;
const core_1 = require("../../../core");
/**
 * Computes the product of an array of numbers.
 *
 * @param obj
 * @param expr
 * @returns {Object}
 */
const $multiply = (obj, expr, options) => {
    const args = (0, core_1.computeValue)(obj, expr, null, options);
    return args.reduce((acc, num) => acc * num, 1);
};
exports.$multiply = $multiply;
