import { isNumber } from "../../util";
import { $push } from "../accumulator";
import { MILLIS_PER_UNIT } from "./_internal";
/**
 * Returns the approximation of the area under a curve.
 */
export function $integral(_, collection, expr, options) {
    const { input, unit } = expr.inputExpr;
    const sortKey = "$" + Object.keys(expr.parentExpr.sortBy)[0];
    // compute the points the expressions for X and Y
    const points = $push(collection, [sortKey, input], options).filter((([x, y]) => isNumber(+x) && isNumber(+y)));
    // invalid values found
    if (points.length !== collection.length)
        return null;
    let result = 0;
    const size = collection.length;
    for (let k = 1; k < size; k++) {
        const [x1, y1] = points[k - 1];
        const [x2, y2] = points[k];
        // convert from millis to the unit.
        const deltaX = (x2 - x1) / (MILLIS_PER_UNIT[unit] || 1);
        result += 0.5 * (y1 + y2) * deltaX;
    }
    return result;
}
