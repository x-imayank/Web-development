"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$maxN = void 0;
// https://www.mongodb.com/docs/manual/reference/operator/aggregation/maxN
const core_1 = require("../../core");
const util_1 = require("../../util");
const push_1 = require("./push");
/**
 * Returns an aggregation of the maxmimum value n elements within a group.
 * If the group contains fewer than n elements, $maxN returns all elements in the group.
 *
 * @param {Array} collection The input array
 * @param {Object} expr The right-hand side expression value of the operator
 * @param {Options} options The options to use for this operation
 * @returns {*}
 */
const $maxN = (collection, expr, options) => {
    var _a;
    const copts = core_1.ComputeOptions.init(options);
    const m = collection.length;
    const n = (0, core_1.computeValue)((_a = copts === null || copts === void 0 ? void 0 : copts.local) === null || _a === void 0 ? void 0 : _a.groupId, expr.n, null, copts);
    const arr = (0, push_1.$push)(collection, expr.input, options).filter(o => !(0, util_1.isNil)(o));
    arr.sort((a, b) => -1 * (0, util_1.compare)(a, b));
    return m <= n ? arr : arr.slice(0, n);
};
exports.$maxN = $maxN;
