// Array Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#array-expression-operators
import { ComputeOptions, computeValue } from "../../../core";
import { assert, isArray, truthy } from "../../../util";
/**
 * Selects a subset of the array to return an array with only the elements that match the filter condition.
 *
 * @param  {Object} obj The current document
 * @param  {*} expr The filter spec
 * @return {*}
 */
export const $filter = (obj, expr, options) => {
    const input = computeValue(obj, expr.input, null, options);
    assert(isArray(input), "$filter 'input' expression must resolve to an array");
    const copts = ComputeOptions.init(options, obj);
    const k = expr.as || "this";
    const local = {
        variables: { [k]: null }
    };
    return input.filter((o) => {
        local.variables[k] = o;
        const b = computeValue(obj, expr.cond, null, copts.update(copts.root, local));
        // allow empty strings only in strict MongoDB mode (default).
        return truthy(b, options.useStrictMode);
    });
};
