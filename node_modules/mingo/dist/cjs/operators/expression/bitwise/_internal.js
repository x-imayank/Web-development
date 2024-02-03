"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bitwise = void 0;
const core_1 = require("../../../core");
const util_1 = require("../../../util");
const bitwise = (op, compute) => (obj, expr, options) => {
    (0, util_1.assert)((0, util_1.isArray)(expr), `${op}: expression must be an array.`);
    const nums = (0, core_1.computeValue)(obj, expr, null, options);
    if (nums.some(util_1.isNil))
        return null;
    (0, util_1.assert)(nums.every(util_1.isNumber), `${op}: expression must evalue to array of numbers.`);
    return compute(nums);
};
exports.bitwise = bitwise;
