"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$locf = void 0;
const util_1 = require("../../util");
const push_1 = require("../accumulator/push");
const _internal_1 = require("./_internal");
/**
 * Last observation carried forward. Sets values for null and missing fields in a window to the last non-null value for the field.
 */
function $locf(_, collection, expr, options) {
    return (0, _internal_1.withMemo)(collection, expr, () => {
        const values = (0, push_1.$push)(collection, expr.inputExpr, options);
        for (let i = 1; i < values.length; i++) {
            if ((0, util_1.isNil)(values[i]))
                values[i] = values[i - 1];
        }
        return values;
    }, (series) => series[expr.documentNumber - 1]);
}
exports.$locf = $locf;
