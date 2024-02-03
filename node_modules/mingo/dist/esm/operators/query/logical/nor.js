// Query Logical Operators: https://docs.mongodb.com/manual/reference/operator/query-logical/
import { assert, isArray } from "../../../util";
import { $or } from "./or";
/**
 * Joins query clauses with a logical NOR returns all documents that fail to match both clauses.
 *
 * @param selector
 * @param rhs
 * @returns {Function}
 */
export const $nor = (_, rhs, options) => {
    assert(isArray(rhs), "Invalid expression. $nor expects value to be an array.");
    const f = $or("$or", rhs, options);
    return (obj) => !f(obj);
};
