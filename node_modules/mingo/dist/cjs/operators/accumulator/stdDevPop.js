"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$stdDevPop = void 0;
const util_1 = require("../../util");
const _internal_1 = require("./_internal");
const push_1 = require("./push");
/**
 * Returns the population standard deviation of the input values.
 *
 * @param {Array} collection The input array
 * @param {Object} expr The right-hand side expression value of the operator
 * @param {Options} options The options to use for this operation
 * @return {Number}
 */
const $stdDevPop = (collection, expr, options) => (0, _internal_1.stddev)((0, push_1.$push)(collection, expr, options).filter(util_1.isNumber), false);
exports.$stdDevPop = $stdDevPop;
