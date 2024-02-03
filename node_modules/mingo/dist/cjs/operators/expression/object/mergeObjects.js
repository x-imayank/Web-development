"use strict";
// Object Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#object-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$mergeObjects = void 0;
const core_1 = require("../../../core");
const util_1 = require("../../../util");
/**
 * Combines multiple documents into a single document.
 *
 * @param {*} obj The target object for this expression
 * @param {*} expr The right-hand side of the operator
 * @param {Options} options Options to use for operation
 */
const $mergeObjects = (obj, expr, options) => {
    const docs = (0, core_1.computeValue)(obj, expr, null, options);
    return docs instanceof Array
        ? docs.reduce((memo, o) => (0, util_1.into)(memo, o), {})
        : {};
};
exports.$mergeObjects = $mergeObjects;
