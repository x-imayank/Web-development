// Query Evaluation Operators: https://docs.mongodb.com/manual/reference/operator/query-evaluation/
import { assert, isFunction, truthy } from "../../../util";
/* eslint-disable */
/**
 * Matches documents that satisfy a JavaScript expression.
 *
 * @param selector
 * @param rhs
 * @returns {Function}
 */
export function $where(_, rhs, options) {
    assert(options.scriptEnabled, "$where operator requires 'scriptEnabled' option to be true");
    const f = rhs;
    assert(isFunction(f), "$where only accepts a Function object");
    return (obj) => truthy(f.call(obj), options === null || options === void 0 ? void 0 : options.useStrictMode);
}
