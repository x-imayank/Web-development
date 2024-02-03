"use strict";
/**
 * String Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#string-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$substr = void 0;
const core_1 = require("../../../core");
const util_1 = require("../../../util");
/**
 * Returns a substring of a string, starting at a specified index position and including the specified number of characters.
 * The index is zero-based.
 *
 * @param obj
 * @param expr
 * @returns {string}
 */
const $substr = (obj, expr, options) => {
    const args = (0, core_1.computeValue)(obj, expr, null, options);
    const s = args[0];
    const index = args[1];
    const count = args[2];
    if ((0, util_1.isString)(s)) {
        if (index < 0) {
            return "";
        }
        else if (count < 0) {
            return s.substr(index);
        }
        else {
            return s.substr(index, count);
        }
    }
    return "";
};
exports.$substr = $substr;
