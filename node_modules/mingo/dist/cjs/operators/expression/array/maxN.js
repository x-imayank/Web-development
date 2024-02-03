"use strict";
// https://www.mongodb.com/docs/manual/reference/operator/aggregation/maxN-array-element/
Object.defineProperty(exports, "__esModule", { value: true });
exports.$maxN = void 0;
const core_1 = require("../../../core");
const util_1 = require("../../../util");
const maxN_1 = require("../../accumulator/maxN");
/**
 * Returns the n largest values in an array.
 *
 * @param  {Object} obj
 * @param  {*} expr
 * @return {*}
 */
const $maxN = (obj, expr, options) => {
    // first try the accumulator if input is an array.
    if (obj instanceof Array)
        return (0, maxN_1.$maxN)(obj, expr, options);
    const { input, n } = (0, core_1.computeValue)(obj, expr, null, options);
    if ((0, util_1.isNil)(input))
        return null;
    (0, util_1.assert)((0, util_1.isArray)(input), "Must resolve to an array/null or missing");
    return (0, maxN_1.$maxN)(input, { n, input: "$$this" }, options);
};
exports.$maxN = $maxN;
