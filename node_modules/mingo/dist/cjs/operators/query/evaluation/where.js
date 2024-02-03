"use strict";
// Query Evaluation Operators: https://docs.mongodb.com/manual/reference/operator/query-evaluation/
Object.defineProperty(exports, "__esModule", { value: true });
exports.$where = void 0;
const util_1 = require("../../../util");
/* eslint-disable */
/**
 * Matches documents that satisfy a JavaScript expression.
 *
 * @param selector
 * @param rhs
 * @returns {Function}
 */
function $where(_, rhs, options) {
    (0, util_1.assert)(options.scriptEnabled, "$where operator requires 'scriptEnabled' option to be true");
    const f = rhs;
    (0, util_1.assert)((0, util_1.isFunction)(f), "$where only accepts a Function object");
    return (obj) => (0, util_1.truthy)(f.call(obj), options === null || options === void 0 ? void 0 : options.useStrictMode);
}
exports.$where = $where;
