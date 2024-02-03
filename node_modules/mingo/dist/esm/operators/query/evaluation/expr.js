// Query Evaluation Operators: https://docs.mongodb.com/manual/reference/operator/query-evaluation/
import { computeValue } from "../../../core";
/**
 * Allows the use of aggregation expressions within the query language.
 *
 * @param selector
 * @param rhs
 * @returns {Function}
 */
export function $expr(_, rhs, options) {
    return obj => computeValue(obj, rhs, null, options);
}
