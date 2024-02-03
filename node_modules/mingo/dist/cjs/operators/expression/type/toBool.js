"use strict";
/**
 * Type Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#type-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$toBool = void 0;
const core_1 = require("../../../core");
const util_1 = require("../../../util");
/**
 * Converts a value to a boolean.
 *
 * @param obj
 * @param expr
 */
const $toBool = (obj, expr, options) => {
    const val = (0, core_1.computeValue)(obj, expr, null, options);
    if ((0, util_1.isNil)(val))
        return null;
    if ((0, util_1.isString)(val))
        return true;
    return Boolean(val);
};
exports.$toBool = $toBool;
