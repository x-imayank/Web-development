"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$derivative = void 0;
const util_1 = require("../../util");
const accumulator_1 = require("../accumulator");
const _internal_1 = require("./_internal");
/**
 * Returns the average rate of change within the specified window
 */
function $derivative(_, collection, expr, options) {
    // need 2 points to compute derivative
    if (collection.length < 2)
        return null;
    const { input, unit } = expr.inputExpr;
    const sortKey = "$" + Object.keys(expr.parentExpr.sortBy)[0];
    const values = [collection[0], collection[collection.length - 1]];
    const points = (0, accumulator_1.$push)(values, [sortKey, input], options).filter((([x, y]) => (0, util_1.isNumber)(+x) && (0, util_1.isNumber)(+y)));
    // invalid values encountered
    if (points.length !== 2)
        return null;
    const [[x1, y1], [x2, y2]] = points;
    // convert from millis to the unit.
    const deltaX = (x2 - x1) / (_internal_1.MILLIS_PER_UNIT[unit] || 1);
    return (y2 - y1) / deltaX;
}
exports.$derivative = $derivative;
