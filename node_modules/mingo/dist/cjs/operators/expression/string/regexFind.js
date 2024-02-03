"use strict";
/**
 * String Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#string-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$regexFind = void 0;
const _internal_1 = require("./_internal");
/**
 * Applies a regular expression (regex) to a string and returns information on the first matched substring.
 *
 * @param obj
 * @param expr
 */
const $regexFind = (obj, expr, options) => {
    const result = (0, _internal_1.regexSearch)(obj, expr, options, { global: false });
    return result && result.length > 0 ? result[0] : null;
};
exports.$regexFind = $regexFind;
