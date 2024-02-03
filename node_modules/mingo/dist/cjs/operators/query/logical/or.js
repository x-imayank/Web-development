"use strict";
// Query Logical Operators: https://docs.mongodb.com/manual/reference/operator/query-logical/
Object.defineProperty(exports, "__esModule", { value: true });
exports.$or = void 0;
const query_1 = require("../../../query");
const util_1 = require("../../../util");
/**
 * Joins query clauses with a logical OR returns all documents that match the conditions of either clause.
 *
 * @param selector
 * @param rhs
 * @returns {Function}
 */
const $or = (_, rhs, options) => {
    (0, util_1.assert)((0, util_1.isArray)(rhs), "Invalid expression. $or expects value to be an Array");
    const queries = rhs.map(expr => new query_1.Query(expr, options));
    return (obj) => queries.some(q => q.test(obj));
};
exports.$or = $or;
