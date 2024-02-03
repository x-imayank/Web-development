"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$addToSet = void 0;
const util_1 = require("../../util");
const _internal_1 = require("./_internal");
/** Adds a value to an array unless the value is already present. */
const $addToSet = (obj, expr, arrayFilters = [], options = {}) => {
    return (0, _internal_1.walkExpression)(expr, arrayFilters, options, (val, node, queries) => {
        const args = { $each: [val] };
        if ((0, util_1.isObject)(val) && (0, util_1.has)(val, "$each")) {
            Object.assign(args, val);
        }
        return (0, _internal_1.applyUpdate)(obj, node, queries, (o, k) => {
            const prev = (o[k] || (o[k] = []));
            const common = (0, util_1.intersection)([prev, args.$each]);
            if (common.length === args.$each.length)
                return false;
            o[k] = (0, _internal_1.clone)(options.cloneMode, (0, util_1.unique)(prev.concat(args.$each)));
            return true;
        }, { buildGraph: true });
    });
};
exports.$addToSet = $addToSet;
