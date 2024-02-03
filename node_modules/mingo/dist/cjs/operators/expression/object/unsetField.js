"use strict";
// Object Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#object-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$unsetField = void 0;
const setField_1 = require("./setField");
/**
 * Adds, updates, or removes a specified field in a document.
 *
 * @param {*} obj The target object for this expression
 * @param {*} expr The right-hand side of the operator
 * @param {Options} options Options to use for operation
 */
const $unsetField = (obj, expr, options) => {
    return (0, setField_1.$setField)(obj, Object.assign(Object.assign({}, expr), { value: "$$REMOVE" }), options);
};
exports.$unsetField = $unsetField;
