import { AccumulatorOperator } from "../../core";
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
export declare const $percentile: AccumulatorOperator<number[]>;
