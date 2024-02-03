"use strict";
// Trignometry Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#trigonometry-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTrignometryOperator = void 0;
const core_1 = require("../../../core");
const FIXED_POINTS = {
    undefined: null,
    null: null,
    NaN: NaN,
    Infinity: new Error(),
    "-Infinity": new Error()
};
/**
 * Returns an operator for a given trignometric function
 *
 * @param f The trignometric function
 */
function createTrignometryOperator(f, fixedPoints = FIXED_POINTS) {
    const fp = Object.assign({}, FIXED_POINTS, fixedPoints);
    const keySet = new Set(Object.keys(fp));
    return (obj, expr, options) => {
        const n = (0, core_1.computeValue)(obj, expr, null, options);
        if (keySet.has(`${n}`)) {
            const res = fp[`${n}`];
            if (res instanceof Error) {
                throw new Error(`cannot apply $${f.name} to -inf, value must in (-inf,inf)`);
            }
            return res;
        }
        return f(n);
    };
}
exports.createTrignometryOperator = createTrignometryOperator;
