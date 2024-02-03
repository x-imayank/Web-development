"use strict";
// Array Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#array-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$arrayToObject = void 0;
const core_1 = require("../../../core");
const util_1 = require("../../../util");
/**
 * Converts an array of key value pairs to a document.
 */
const $arrayToObject = (obj, expr, options) => {
    const arr = (0, core_1.computeValue)(obj, expr, null, options);
    (0, util_1.assert)((0, util_1.isArray)(arr), "$arrayToObject expression must resolve to an array");
    return arr.reduce((newObj, val) => {
        // flatten
        while ((0, util_1.isArray)(val) && val.length === 1)
            val = val[0];
        if (val instanceof Array && val.length == 2) {
            newObj[val[0]] = val[1];
        }
        else {
            const valObj = val;
            (0, util_1.assert)((0, util_1.isObject)(valObj) && (0, util_1.has)(valObj, "k") && (0, util_1.has)(valObj, "v"), "$arrayToObject expression is invalid.");
            newObj[valObj.k] = valObj.v;
        }
        return newObj;
    }, {});
};
exports.$arrayToObject = $arrayToObject;
