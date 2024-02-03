"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$topN = void 0;
// https://www.mongodb.com/docs/manual/reference/operator/aggregation/topN/#mongodb-group-grp.-topN
const aggregator_1 = require("../../aggregator");
const core_1 = require("../../core");
const push_1 = require("./push");
/**
 * Returns an aggregation of the top n elements within a group, according to the specified sort order.
 * If the group contains fewer than n elements, $topN returns all elements in the group.
 *
 * @param {Array} collection The input array
 * @param {Object} expr The right-hand side expression value of the operator
 * @param {Options} options The options to use for this operation
 * @returns {*}
 */
const $topN = (collection, expr, options) => {
    const copts = core_1.ComputeOptions.init(options);
    const { n, sortBy } = (0, core_1.computeValue)(copts.local.groupId, expr, null, copts);
    const result = new aggregator_1.Aggregator([{ $sort: sortBy }, { $limit: n }], copts).run(collection);
    return (0, push_1.$push)(result, expr.output, copts);
};
exports.$topN = $topN;
