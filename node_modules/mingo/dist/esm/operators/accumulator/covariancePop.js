import { covariance } from "./_internal";
import { $push } from "./push";
/**
 * Returns the population covariance of two numeric expressions.
 * @param  {Array} collection
 * @param  {Object} expr
 * @return {Number|null}
 */
export const $covariancePop = (collection, expr, options) => covariance($push(collection, expr, options), false);
