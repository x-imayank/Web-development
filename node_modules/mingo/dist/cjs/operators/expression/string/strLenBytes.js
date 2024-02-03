"use strict";
/**
 * String Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#string-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$strLenBytes = void 0;
const core_1 = require("../../../core");
/**
 * Returns the number of UTF-8 encoded bytes in the specified string.
 *
 * @param  {Object} obj
 * @param  {String} expr
 * @return {Number}
 */
const $strLenBytes = (obj, expr, options) => {
    return ~-encodeURI((0, core_1.computeValue)(obj, expr, null, options)).split(/%..|./).length;
};
exports.$strLenBytes = $strLenBytes;
