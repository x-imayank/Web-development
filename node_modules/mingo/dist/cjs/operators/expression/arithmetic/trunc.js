"use strict";
// Arithmetic Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#arithmetic-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$trunc = void 0;
const core_1 = require("../../../core");
const util_1 = require("../../../util");
const _internal_1 = require("./_internal");
/**
 * Truncates a number to a whole integer or to a specified decimal place.
 *
 * @param obj
 * @param expr
 * @returns {number}
 */
const $trunc = (obj, expr, options) => {
    const arr = (0, core_1.computeValue)(obj, expr, null, options);
    const num = arr[0];
    const places = arr[1];
    if ((0, util_1.isNil)(num) || isNaN(num) || Math.abs(num) === Infinity)
        return num;
    (0, util_1.assert)((0, util_1.isNumber)(num), "$trunc expression must resolve to a number.");
    (0, util_1.assert)((0, util_1.isNil)(places) || ((0, util_1.isNumber)(places) && places > -20 && places < 100), "$trunc expression has invalid place");
    return (0, _internal_1.truncate)(num, places, false);
};
exports.$trunc = $trunc;
