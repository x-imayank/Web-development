"use strict";
// https://www.mongodb.com/docs/manual/reference/operator/aggregation/lastN-array-element/#mongodb-expression-exp.-lastN
Object.defineProperty(exports, "__esModule", { value: true });
exports.$lastN = void 0;
const core_1 = require("../../../core");
const util_1 = require("../../../util");
const lastN_1 = require("../../accumulator/lastN");
/**
 * Returns a specified number of elements from the end of an array.
 *
 * @param  {Object} obj
 * @param  {*} expr
 * @return {*}
 */
const $lastN = (obj, expr, options) => {
    // first try the accumulator if input is an array.
    if (obj instanceof Array)
        return (0, lastN_1.$lastN)(obj, expr, options);
    const { input, n } = (0, core_1.computeValue)(obj, expr, null, options);
    if ((0, util_1.isNil)(input))
        return null;
    (0, util_1.assert)((0, util_1.isArray)(input), "Must resolve to an array/null or missing");
    return (0, lastN_1.$lastN)(input, { n, input: "$$this" }, options);
};
exports.$lastN = $lastN;
