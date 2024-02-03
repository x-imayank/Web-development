"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$percentile = void 0;
const util_1 = require("../../util");
const push_1 = require("./push");
/**
 * Returns an array of scalar values that correspond to specified percentile values. Uses "approximate" method by default.
 *
 * If 'expr.method' is "approximate", we return the closest value to the computed percentile from the dataset.
 * If 'expr.method' is "exact", we return the computed percentile value as is which may not be found in the dataset.
 *
 * @param collection The collection of objects.
 * @param expr The operator expression.
 * @param options Options to use for processing.
 * @returns {Object|*}
 */
const $percentile = (collection, expr, options) => {
    // MongoDB uses the t-digest algorithm to estimate percentiles.
    // Since this library expects all data in memory we use the linear interpolation method.
    const X = (0, push_1.$push)(collection, expr.input, options).filter(util_1.isNumber).sort();
    const centiles = (0, push_1.$push)(expr.p, "$$CURRENT", options).filter(util_1.isNumber);
    const method = expr.method || "approximate";
    return centiles.map(p => {
        (0, util_1.assert)(p > 0 && p <= 1, `percentile value must be between 0 (exclusive) and 1 (inclusive): invalid '${p}'.`);
        // compute rank for the percentile
        const r = p * (X.length - 1) + 1;
        // get the integer part
        const ri = Math.floor(r);
        // return zero for NaN values when X[ri-1] is undefined.
        const result = r === ri ? X[r - 1] : X[ri - 1] + (r % 1) * (X[ri] - X[ri - 1] || 0);
        switch (method) {
            case "exact":
                return result;
            case "approximate": {
                // returns nearest value (inclusive) that is closest to the given centile.
                const i = (0, util_1.findInsertIndex)(X, result);
                // we need to adjust the selected value based on whether it falls within the percentile range.
                // e.g. for X = [10, 20], p <= 0.5 should equal 10 AND p > 0.5 should equal 20.
                return i / X.length >= p ? X[Math.max(i - 1, 0)] : X[i];
            }
        }
    });
};
exports.$percentile = $percentile;
