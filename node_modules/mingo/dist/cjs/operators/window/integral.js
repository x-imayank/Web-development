"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$integral = void 0;
const util_1 = require("../../util");
const accumulator_1 = require("../accumulator");
const _internal_1 = require("./_internal");
/**
 * Returns the approximation of the area under a curve.
 */
function $integral(_, collection, expr, options) {
    const { input, unit } = expr.inputExpr;
    const sortKey = "$" + Object.keys(expr.parentExpr.sortBy)[0];
    // compute the points the expressions for X and Y
    const points = (0, accumulator_1.$push)(collection, [sortKey, input], options).filter((([x, y]) => (0, util_1.isNumber)(+x) && (0, util_1.isNumber)(+y)));
    // invalid values found
    if (points.length !== collection.length)
        return null;
    let result = 0;
    const size = collection.length;
    for (let k = 1; k < size; k++) {
        const [x1, y1] = points[k - 1];
        const [x2, y2] = points[k];
        // convert from millis to the unit.
        const deltaX = (x2 - x1) / (_internal_1.MILLIS_PER_UNIT[unit] || 1);
        result += 0.5 * (y1 + y2) * deltaX;
    }
    return result;
}
exports.$integral = $integral;
