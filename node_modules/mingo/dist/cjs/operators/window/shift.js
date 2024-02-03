"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$shift = void 0;
const core_1 = require("../../core");
/**
 * Returns the value from an expression applied to a document in a specified
 * position relative to the current document in the $setWindowFields stage partition.
 */
function $shift(obj, collection, expr, options) {
    const input = expr.inputExpr;
    const shiftedIndex = expr.documentNumber - 1 + input.by;
    if (shiftedIndex < 0 || shiftedIndex > collection.length - 1) {
        return input.default
            ? (0, core_1.computeValue)(obj, input.default, null, options)
            : null;
    }
    return (0, core_1.computeValue)(collection[shiftedIndex], input.output, null, options);
}
exports.$shift = $shift;
