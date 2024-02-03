"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$percentile = void 0;
const core_1 = require("../../core");
const percentile_1 = require("../accumulator/percentile");
/**
 * Returns an array of scalar values that correspond to specified percentile values.
 *
 * @param obj The current object
 * @param expr The operator expression
 * @param options Options to use for processing
 * @returns {Array<number>}
 */
const $percentile = (obj, expr, options) => {
    const input = (0, core_1.computeValue)(obj, expr.input, null, options);
    return (0, percentile_1.$percentile)(input, Object.assign(Object.assign({}, expr), { input: "$$CURRENT" }), options);
};
exports.$percentile = $percentile;
