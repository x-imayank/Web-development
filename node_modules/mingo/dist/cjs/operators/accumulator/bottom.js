"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$bottom = void 0;
const bottomN_1 = require("./bottomN");
/**
 * Returns the bottom element within a group according to the specified sort order.
 *
 * @param {Array} collection The input array
 * @param {Object} expr The right-hand side expression value of the operator
 * @param {Options} options The options to use for this operation
 * @returns {*}
 */
const $bottom = (collection, expr, options) => (0, bottomN_1.$bottomN)(collection, Object.assign(Object.assign({}, expr), { n: 1 }), options);
exports.$bottom = $bottom;
