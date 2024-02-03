"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$median = void 0;
const percentile_1 = require("./percentile");
/**
 * Returns the median of the dataset. The 'expr.method' defaults to "approximate" to return a median value from the dataset.
 *
 * If 'expr.method' is "approximate", we return the smallest of the middle values when dataset is even.
 * If 'expr.method' is "exact", we return the average of the middle values when dataset is even.
 * For an odd dataset, the middle value is always returned regardless of 'expr.method'.
 *
 * @param collection The collection of objects.
 * @param expr The operator expression.
 * @param options Options to use for processing.
 * @returns {Number}
 */
const $median = (collection, expr, options) => (0, percentile_1.$percentile)(collection, Object.assign(Object.assign({}, expr), { p: [0.5] }), options).pop();
exports.$median = $median;
