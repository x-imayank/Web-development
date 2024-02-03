// Query Logical Operators: https://docs.mongodb.com/manual/reference/operator/query-logical/
import { Query } from "../../../query";
import { normalize } from "../../../util";
/**
 * Inverts the effect of a query expression and returns documents that do not match the query expression.
 *
 * @param selector
 * @param rhs
 * @returns {Function}
 */
export const $not = (selector, rhs, options) => {
    const criteria = {};
    criteria[selector] = normalize(rhs);
    const query = new Query(criteria, options);
    return (obj) => !query.test(obj);
};
