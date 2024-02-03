"use strict";
/**
 * Type Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#type-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$isNumber = void 0;
const core_1 = require("../../../core");
const util_1 = require("../../../util");
/**
 * Checks if the specified expression resolves to a numeric value
 *
 * @param obj
 * @param expr
 */
const $isNumber = (obj, expr, options) => {
    const n = (0, core_1.computeValue)(obj, expr, null, options);
    return (0, util_1.isNumber)(n);
};
exports.$isNumber = $isNumber;
