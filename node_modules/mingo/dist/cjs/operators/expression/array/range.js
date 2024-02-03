"use strict";
// Array Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#array-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$range = void 0;
const core_1 = require("../../../core");
/**
 * Returns an array whose elements are a generated sequence of numbers.
 *
 * @param  {Object} obj
 * @param  {*} expr
 * @return {*}
 */
const $range = (obj, expr, options) => {
    const arr = (0, core_1.computeValue)(obj, expr, null, options);
    const start = arr[0];
    const end = arr[1];
    const step = arr[2] || 1;
    const result = new Array();
    let counter = start;
    while ((counter < end && step > 0) || (counter > end && step < 0)) {
        result.push(counter);
        counter += step;
    }
    return result;
};
exports.$range = $range;
