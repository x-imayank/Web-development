"use strict";
/**
 * Type Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#type-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$toDouble = void 0;
const core_1 = require("../../../core");
const util_1 = require("../../../util");
const _internal_1 = require("./_internal");
/**
 * Converts a value to a double. If the value cannot be converted to an double, $toDouble errors. If the value is null or missing, $toDouble returns null.
 *
 * @param obj
 * @param expr
 */
const $toDouble = (obj, expr, options) => {
    const val = (0, core_1.computeValue)(obj, expr, null, options);
    if ((0, util_1.isNil)(val))
        return null;
    if (val instanceof Date)
        return val.getTime();
    if (val === true)
        return 1;
    if (val === false)
        return 0;
    const n = Number(val);
    if ((0, util_1.isNumber)(n))
        return n;
    throw new _internal_1.TypeConvertError(`cannot convert '${val}' to double/decimal`);
};
exports.$toDouble = $toDouble;
