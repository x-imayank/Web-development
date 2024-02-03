"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$max = void 0;
const util_1 = require("../../util");
const _internal_1 = require("./_internal");
/** Updates the value of the field to a specified value if the specified value is greater than the current value of the field. */
const $max = (obj, expr, arrayFilters = [], options = {}) => {
    return (0, _internal_1.walkExpression)(expr, arrayFilters, options, ((val, node, queries) => {
        // If the field does not exist, the $max operator sets the field to the specified value.
        return (0, _internal_1.applyUpdate)(obj, node, queries, (o, k) => {
            if (o[k] !== undefined && (0, util_1.compare)(o[k], val) > -1)
                return false;
            o[k] = val;
            return true;
        }, { buildGraph: true });
    }));
};
exports.$max = $max;
