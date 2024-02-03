"use strict";
/**
 * String Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#string-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$toLower = void 0;
const core_1 = require("../../../core");
const util_1 = require("../../../util");
/**
 * Converts a string to lowercase.
 *
 * @param obj
 * @param expr
 * @returns {string}
 */
const $toLower = (obj, expr, options) => {
    const value = (0, core_1.computeValue)(obj, expr, null, options);
    return (0, util_1.isEmpty)(value) ? "" : value.toLowerCase();
};
exports.$toLower = $toLower;
