"use strict";
/**
 * Type Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#type-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$toString = void 0;
const core_1 = require("../../../core");
const util_1 = require("../../../util");
const dateToString_1 = require("../date/dateToString");
const $toString = (obj, expr, options) => {
    const val = (0, core_1.computeValue)(obj, expr, null, options);
    if ((0, util_1.isNil)(val))
        return null;
    if (val instanceof Date) {
        const dateExpr = {
            date: expr,
            format: "%Y-%m-%dT%H:%M:%S.%LZ"
        };
        return (0, dateToString_1.$dateToString)(obj, dateExpr, options);
    }
    else {
        return val.toString();
    }
};
exports.$toString = $toString;
