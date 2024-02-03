"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$top = void 0;
const topN_1 = require("./topN");
/**
 * Returns the top element within a group according to the specified sort order.
 *
 * @param {Array} collection The input array
 * @param {Object} expr The right-hand side expression value of the operator
 * @param {Options} options The options to use for this operation
 * @returns {*}
 */
const $top = (collection, expr, options) => (0, topN_1.$topN)(collection, Object.assign(Object.assign({}, expr), { n: 1 }), options);
exports.$top = $top;
