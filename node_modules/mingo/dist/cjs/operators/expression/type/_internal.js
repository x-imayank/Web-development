"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toInteger = exports.TypeConvertError = void 0;
const core_1 = require("../../../core");
const util_1 = require("../../../util");
class TypeConvertError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.TypeConvertError = TypeConvertError;
function toInteger(obj, expr, options, max, min, typename) {
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
    if ((0, util_1.isNumber)(n) && n >= min && n <= max) {
        // weirdly a decimal in string format cannot be converted to int.
        // so we must check input if not string or if it is, not in decimal format
        if (!(0, util_1.isString)(val) || n.toString().indexOf(".") === -1) {
            return Math.trunc(n);
        }
    }
    throw new TypeConvertError(`cannot convert '${val}' to ${typename}`);
}
exports.toInteger = toInteger;
