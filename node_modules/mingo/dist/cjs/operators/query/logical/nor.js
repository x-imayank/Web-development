"use strict";
// Query Logical Operators: https://docs.mongodb.com/manual/reference/operator/query-logical/
Object.defineProperty(exports, "__esModule", { value: true });
exports.$nor = void 0;
const util_1 = require("../../../util");
const or_1 = require("./or");
/**
 * Joins query clauses with a logical NOR returns all documents that fail to match both clauses.
 *
 * @param selector
 * @param rhs
 * @returns {Function}
 */
const $nor = (_, rhs, options) => {
    (0, util_1.assert)((0, util_1.isArray)(rhs), "Invalid expression. $nor expects value to be an array.");
    const f = (0, or_1.$or)("$or", rhs, options);
    return (obj) => !f(obj);
};
exports.$nor = $nor;
