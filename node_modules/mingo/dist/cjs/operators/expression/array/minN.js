"use strict";
// https://www.mongodb.com/docs/manual/reference/operator/aggregation/minN-array-element/
Object.defineProperty(exports, "__esModule", { value: true });
exports.$minN = void 0;
const core_1 = require("../../../core");
const util_1 = require("../../../util");
const minN_1 = require("../../accumulator/minN");
/**
 * Returns the n smallest values in an array.
 *
 * @param  {Object} obj
 * @param  {*} expr
 * @return {*}
 */
const $minN = (obj, expr, options) => {
    // first try the accumulator if input is an array.
    if (obj instanceof Array)
        return (0, minN_1.$minN)(obj, expr, options);
    const { input, n } = (0, core_1.computeValue)(obj, expr, null, options);
    if ((0, util_1.isNil)(input))
        return null;
    (0, util_1.assert)((0, util_1.isArray)(input), "Must resolve to an array/null or missing");
    return (0, minN_1.$minN)(input, { n, input: "$$this" }, options);
};
exports.$minN = $minN;
