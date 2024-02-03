"use strict";
// https://www.mongodb.com/docs/manual/reference/operator/aggregation/sortArray/#mongodb-expression-exp.-sortArray
Object.defineProperty(exports, "__esModule", { value: true });
exports.$sortArray = void 0;
const aggregator_1 = require("../../../aggregator");
const core_1 = require("../../../core");
const util_1 = require("../../../util");
/**
 * Sorts an array based on its elements. The sort order is user specified.
 *
 * @param obj The target object
 * @param expr The expression argument
 * @param options Options
 * @returns
 */
const $sortArray = (obj, expr, options) => {
    const { input, sortBy } = (0, core_1.computeValue)(obj, expr, null, options);
    if ((0, util_1.isNil)(input))
        return null;
    (0, util_1.assert)((0, util_1.isArray)(input), "$sortArray expression must resolve to an array");
    if ((0, util_1.isObject)(sortBy)) {
        return new aggregator_1.Aggregator([{ $sort: sortBy }]).run(input);
    }
    const result = [...input];
    result.sort(util_1.compare);
    if (sortBy === -1)
        result.reverse();
    return result;
};
exports.$sortArray = $sortArray;
