"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$covariancePop = void 0;
const _internal_1 = require("./_internal");
const push_1 = require("./push");
/**
 * Returns the population covariance of two numeric expressions.
 * @param  {Array} collection
 * @param  {Object} expr
 * @return {Number|null}
 */
const $covariancePop = (collection, expr, options) => (0, _internal_1.covariance)((0, push_1.$push)(collection, expr, options), false);
exports.$covariancePop = $covariancePop;
