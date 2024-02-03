"use strict";
/**
 * String Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#string-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$replaceOne = void 0;
const core_1 = require("../../../core");
const util_1 = require("../../../util");
/**
 * Replaces the first instance of a matched string in a given input.
 *
 * @param  {Object} obj
 * @param  {Array} expr
 */
const $replaceOne = (obj, expr, options) => {
    const args = (0, core_1.computeValue)(obj, expr, null, options);
    const arr = [args.input, args.find, args.replacement];
    if (arr.some(util_1.isNil))
        return null;
    (0, util_1.assert)(arr.every(util_1.isString), "$replaceOne expression fields must evaluate to string");
    return args.input.replace(args.find, args.replacement);
};
exports.$replaceOne = $replaceOne;
