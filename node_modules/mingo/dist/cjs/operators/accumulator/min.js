"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$min = void 0;
const util_1 = require("../../util");
const push_1 = require("./push");
/**
 * Returns the lowest value in a group.
 *
 * @param {Array} collection The input array
 * @param {Object} expr The right-hand side expression value of the operator
 * @param {Options} The options to use for this operator
 * @returns {*}
 */
const $min = (collection, expr, options) => {
    const nums = (0, push_1.$push)(collection, expr, options).filter(util_1.isNotNaN);
    const n = nums.reduce((acc, n) => ((0, util_1.compare)(n, acc) <= 0 ? n : acc), Infinity);
    return n === Infinity ? undefined : n;
};
exports.$min = $min;
