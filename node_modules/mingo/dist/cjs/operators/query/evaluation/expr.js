"use strict";
// Query Evaluation Operators: https://docs.mongodb.com/manual/reference/operator/query-evaluation/
Object.defineProperty(exports, "__esModule", { value: true });
exports.$expr = void 0;
const core_1 = require("../../../core");
/**
 * Allows the use of aggregation expressions within the query language.
 *
 * @param selector
 * @param rhs
 * @returns {Function}
 */
function $expr(_, rhs, options) {
    return obj => (0, core_1.computeValue)(obj, rhs, null, options);
}
exports.$expr = $expr;
