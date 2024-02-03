"use strict";
// Object Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#object-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$objectToArray = void 0;
const core_1 = require("../../../core");
const util_1 = require("../../../util");
/**
 * Converts a document to an array of documents representing key-value pairs.
 *
 * @param {*} obj The target object for this expression
 * @param {*} expr The right-hand side of the operator
 * @param {Options} options Options to use for operation
 */
const $objectToArray = (obj, expr, options) => {
    const val = (0, core_1.computeValue)(obj, expr, null, options);
    (0, util_1.assert)((0, util_1.isObject)(val), "$objectToArray expression must resolve to an object");
    const entries = Object.entries(val);
    const result = new Array(entries.length);
    let i = 0;
    for (const [k, v] of entries) {
        result[i++] = { k, v };
    }
    return result;
};
exports.$objectToArray = $objectToArray;
