"use strict";
// Query Logical Operators: https://docs.mongodb.com/manual/reference/operator/query-logical/
Object.defineProperty(exports, "__esModule", { value: true });
exports.$not = void 0;
const query_1 = require("../../../query");
const util_1 = require("../../../util");
/**
 * Inverts the effect of a query expression and returns documents that do not match the query expression.
 *
 * @param selector
 * @param rhs
 * @returns {Function}
 */
const $not = (selector, rhs, options) => {
    const criteria = {};
    criteria[selector] = (0, util_1.normalize)(rhs);
    const query = new query_1.Query(criteria, options);
    return (obj) => !query.test(obj);
};
exports.$not = $not;
