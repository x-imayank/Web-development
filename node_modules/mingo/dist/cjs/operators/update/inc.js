"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$inc = void 0;
const util_1 = require("../../util");
const _internal_1 = require("./_internal");
/** Increments a field by a specified value. */
const $inc = (obj, expr, arrayFilters = [], options = {}) => {
    return (0, _internal_1.walkExpression)(expr, arrayFilters, options, (val, node, queries) => {
        if (!node.child) {
            const n = (0, util_1.resolve)(obj, node.parent);
            (0, util_1.assert)(n === undefined || (0, util_1.isNumber)(n), `cannot apply $inc to a value of non-numeric type`);
        }
        return (0, _internal_1.applyUpdate)(obj, node, queries, (o, k) => {
            o[k] = (o[k] || (o[k] = 0)) + val;
            return true;
        }, { buildGraph: true });
    });
};
exports.$inc = $inc;
