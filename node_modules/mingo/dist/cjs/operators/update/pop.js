"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$pop = void 0;
const util_1 = require("../../util");
const _internal_1 = require("./_internal");
/** Removes the first or last element of an array. */
const $pop = (obj, expr, arrayFilters = [], options = {}) => {
    return (0, _internal_1.walkExpression)(expr, arrayFilters, options, ((val, node, queries) => {
        return (0, _internal_1.applyUpdate)(obj, node, queries, (o, k) => {
            const arr = o[k];
            (0, util_1.assert)((0, util_1.isArray)(arr), `path '${node.selector}' contains an element of non-array type.`);
            if (!arr.length)
                return false;
            if (val === -1) {
                arr.splice(0, 1);
            }
            else {
                arr.pop();
            }
            return true;
        });
    }));
};
exports.$pop = $pop;
