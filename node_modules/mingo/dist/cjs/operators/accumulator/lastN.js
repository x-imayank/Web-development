"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$lastN = void 0;
// https://www.mongodb.com/docs/manual/reference/operator/aggregation/lastN/
const core_1 = require("../../core");
const push_1 = require("./push");
/**
 * Returns an aggregation of the last n elements within a group. The elements returned are meaningful only if in a specified sort order.
 * If the group contains fewer than n elements, $lastN returns all elements in the group.
 *
 * @param {Array} collection The input array
 * @param {Object} expr The right-hand side expression value of the operator
 * @param {Options} options The options to use for this operation
 * @returns {*}
 */
const $lastN = (collection, expr, options) => {
    var _a;
    const copts = core_1.ComputeOptions.init(options);
    const m = collection.length;
    const n = (0, core_1.computeValue)((_a = copts === null || copts === void 0 ? void 0 : copts.local) === null || _a === void 0 ? void 0 : _a.groupId, expr.n, null, copts);
    return (0, push_1.$push)(m <= n ? collection : collection.slice(m - n), expr.input, options);
};
exports.$lastN = $lastN;
