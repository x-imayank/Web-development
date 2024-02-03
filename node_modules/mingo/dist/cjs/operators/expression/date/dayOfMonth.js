"use strict";
// Date Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#date-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$dayOfMonth = void 0;
const _internal_1 = require("./_internal");
/**
 * Returns the day of the month for a date as a number between 1 and 31.
 * @param obj
 * @param expr
 */
const $dayOfMonth = (obj, expr, options) => {
    return (0, _internal_1.computeDate)(obj, expr, options).getUTCDate();
};
exports.$dayOfMonth = $dayOfMonth;
