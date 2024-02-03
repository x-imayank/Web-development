import { covariance } from "./_internal";
import { $push } from "./push";
/**
 * Returns the sample covariance of two numeric expressions.
 * @param  {Array} collection
 * @param  {Object} expr
 * @return {Number|null}
 */
export const $covarianceSamp = (collection, expr, options) => covariance($push(collection, expr, options), true);
