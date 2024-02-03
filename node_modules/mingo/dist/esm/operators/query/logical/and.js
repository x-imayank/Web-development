// Query Logical Operators: https://docs.mongodb.com/manual/reference/operator/query-logical/
import { Query } from "../../../query";
import { assert, isArray } from "../../../util";
/**
 * Joins query clauses with a logical AND returns all documents that match the conditions of both clauses.
 *
 * @param selector
 * @param rhs
 * @returns {Function}
 */
export const $and = (_, rhs, options) => {
    assert(isArray(rhs), "Invalid expression: $and expects value to be an Array.");
    const queries = rhs.map(expr => new Query(expr, options));
    return (obj) => queries.every(q => q.test(obj));
};
