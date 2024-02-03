import { $percentile } from "./percentile";
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
export const $median = (collection, expr, options) => $percentile(collection, Object.assign(Object.assign({}, expr), { p: [0.5] }), options).pop();
