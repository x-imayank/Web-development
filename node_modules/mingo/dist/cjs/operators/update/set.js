"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$set = void 0;
const util_1 = require("../../util");
const _internal_1 = require("./_internal");
/** Replaces the value of a field with the specified value. */
const $set = (obj, expr, arrayFilters = [], options = {}) => {
    return (0, _internal_1.walkExpression)(expr, arrayFilters, options, (val, node, queries) => {
        return (0, _internal_1.applyUpdate)(obj, node, queries, (o, k) => {
            if ((0, util_1.isEqual)(o[k], val))
                return false;
            o[k] = (0, _internal_1.clone)(options.cloneMode, val);
            return true;
        }, { buildGraph: true });
    });
};
exports.$set = $set;
