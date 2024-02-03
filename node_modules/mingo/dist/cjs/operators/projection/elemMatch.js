"use strict";
// $elemMatch operator. https://docs.mongodb.com/manual/reference/operator/projection/elemMatch/#proj._S_elemMatch
Object.defineProperty(exports, "__esModule", { value: true });
exports.$elemMatch = void 0;
const query_1 = require("../../query");
const util_1 = require("../../util");
/**
 * Projects only the first element from an array that matches the specified $elemMatch condition.
 *
 * @param obj
 * @param field
 * @param expr
 * @returns {*}
 */
const $elemMatch = (obj, expr, field, options) => {
    const arr = (0, util_1.resolve)(obj, field);
    const query = new query_1.Query(expr, options);
    (0, util_1.assert)(arr instanceof Array, "$elemMatch: argument must resolve to array");
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        if (query.test(arr[i])) {
            // MongoDB projects only the first nested document when using this operator.
            // For some use cases this can lead to complicated queries to selectively project nested documents.
            // When strict mode is disabled, we return all matching nested documents.
            if (options.useStrictMode)
                return [arr[i]];
            result.push(arr[i]);
        }
    }
    return result.length > 0 ? result : undefined;
};
exports.$elemMatch = $elemMatch;
