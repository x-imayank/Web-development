"use strict";
// Array Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#array-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$filter = void 0;
const core_1 = require("../../../core");
const util_1 = require("../../../util");
/**
 * Selects a subset of the array to return an array with only the elements that match the filter condition.
 *
 * @param  {Object} obj The current document
 * @param  {*} expr The filter spec
 * @return {*}
 */
const $filter = (obj, expr, options) => {
    const input = (0, core_1.computeValue)(obj, expr.input, null, options);
    (0, util_1.assert)((0, util_1.isArray)(input), "$filter 'input' expression must resolve to an array");
    const copts = core_1.ComputeOptions.init(options, obj);
    const k = expr.as || "this";
    const local = {
        variables: { [k]: null }
    };
    return input.filter((o) => {
        local.variables[k] = o;
        const b = (0, core_1.computeValue)(obj, expr.cond, null, copts.update(copts.root, local));
        // allow empty strings only in strict MongoDB mode (default).
        return (0, util_1.truthy)(b, options.useStrictMode);
    });
};
exports.$filter = $filter;
