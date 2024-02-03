"use strict";
// Query Logical Operators: https://docs.mongodb.com/manual/reference/operator/query-logical/
Object.defineProperty(exports, "__esModule", { value: true });
exports.$and = void 0;
const query_1 = require("../../../query");
const util_1 = require("../../../util");
/**
 * Joins query clauses with a logical AND returns all documents that match the conditions of both clauses.
 *
 * @param selector
 * @param rhs
 * @returns {Function}
 */
const $and = (_, rhs, options) => {
    (0, util_1.assert)((0, util_1.isArray)(rhs), "Invalid expression: $and expects value to be an Array.");
    const queries = rhs.map(expr => new query_1.Query(expr, options));
    return (obj) => queries.every(q => q.test(obj));
};
exports.$and = $and;
