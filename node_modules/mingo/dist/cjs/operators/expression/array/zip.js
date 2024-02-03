"use strict";
// Array Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#array-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$zip = void 0;
const core_1 = require("../../../core");
const util_1 = require("../../../util");
/**
 * Merge two lists together.
 *
 * Transposes an array of input arrays so that the first element of the output array would be an array containing,
 * the first element of the first input array, the first element of the second input array, etc.
 *
 * @param  {Obj} obj
 * @param  {*} expr
 * @return {*}
 */
const $zip = (obj, expr, options) => {
    const inputs = (0, core_1.computeValue)(obj, expr.inputs, null, options);
    const useLongestLength = expr.useLongestLength || false;
    (0, util_1.assert)((0, util_1.isArray)(inputs), "'inputs' expression must resolve to an array");
    (0, util_1.assert)((0, util_1.isBoolean)(useLongestLength), "'useLongestLength' must be a boolean");
    if ((0, util_1.isArray)(expr.defaults)) {
        (0, util_1.assert)(useLongestLength, "'useLongestLength' must be set to true to use 'defaults'");
    }
    let zipCount = 0;
    for (let i = 0, len = inputs.length; i < len; i++) {
        const arr = inputs[i];
        if ((0, util_1.isNil)(arr))
            return null;
        (0, util_1.assert)((0, util_1.isArray)(arr), "'inputs' expression values must resolve to an array or null");
        zipCount = useLongestLength
            ? Math.max(zipCount, arr.length)
            : Math.min(zipCount || arr.length, arr.length);
    }
    const result = [];
    const defaults = expr.defaults || [];
    for (let i = 0; i < zipCount; i++) {
        const temp = inputs.map((val, index) => {
            return (0, util_1.isNil)(val[i]) ? defaults[index] || null : val[i];
        });
        result.push(temp);
    }
    return result;
};
exports.$zip = $zip;
