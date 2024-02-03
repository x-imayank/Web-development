"use strict";
// Trignometry Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#trigonometry-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$atan2 = void 0;
const core_1 = require("../../../core");
const util_1 = require("../../../util");
/**
 * Returns the inverse tangent (arc tangent) of y / x in radians, where y and x are the first and second values passed to the expression respectively. */
const $atan2 = (obj, expr, options) => {
    const [y, x] = (0, core_1.computeValue)(obj, expr, null, options);
    if (isNaN(y) || (0, util_1.isNil)(y))
        return y;
    if (isNaN(x) || (0, util_1.isNil)(x))
        return x;
    return Math.atan2(y, x);
};
exports.$atan2 = $atan2;
