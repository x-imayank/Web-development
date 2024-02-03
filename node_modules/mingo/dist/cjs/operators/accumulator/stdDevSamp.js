"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$stdDevSamp = void 0;
const util_1 = require("../../util");
const _internal_1 = require("./_internal");
const push_1 = require("./push");
/**
 * Returns the sample standard deviation of the input values.
 * @param  {Array} collection
 * @param  {Object} expr
 * @return {Number|null}
 */
const $stdDevSamp = (collection, expr, options) => (0, _internal_1.stddev)((0, push_1.$push)(collection, expr, options).filter(util_1.isNumber), true);
exports.$stdDevSamp = $stdDevSamp;
