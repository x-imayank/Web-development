"use strict";
// $slice operator. https://docs.mongodb.com/manual/reference/operator/projection/slice/#proj._S_slice
Object.defineProperty(exports, "__esModule", { value: true });
exports.$slice = void 0;
const util_1 = require("../../util");
const slice_1 = require("../expression/array/slice");
/**
 * Limits the number of elements projected from an array. Supports skip and limit slices.
 *
 * @param obj
 * @param field
 * @param expr
 */
const $slice = (obj, expr, field, options) => {
    const xs = (0, util_1.resolve)(obj, field);
    const exprAsArray = expr;
    if (!(0, util_1.isArray)(xs))
        return xs;
    return (0, slice_1.$slice)(obj, expr instanceof Array ? [xs, ...exprAsArray] : [xs, expr], options);
};
exports.$slice = $slice;
