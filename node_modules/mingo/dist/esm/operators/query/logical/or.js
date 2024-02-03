// Query Logical Operators: https://docs.mongodb.com/manual/reference/operator/query-logical/
import { Query } from "../../../query";
import { assert, isArray } from "../../../util";
/**
 * Joins query clauses with a logical OR returns all documents that match the conditions of either clause.
 *
 * @param selector
 * @param rhs
 * @returns {Function}
 */
export const $or = (_, rhs, options) => {
    assert(isArray(rhs), "Invalid expression. $or expects value to be an Array");
    const queries = rhs.map(expr => new Query(expr, options));
    return (obj) => queries.some(q => q.test(obj));
};
