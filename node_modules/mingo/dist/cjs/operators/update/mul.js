"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$mul = void 0;
const _internal_1 = require("./_internal");
/** Multiply the value of a field by a number. */
const $mul = (obj, expr, arrayFilters = [], options = {}) => {
    return (0, _internal_1.walkExpression)(expr, arrayFilters, options, ((val, node, queries) => {
        return (0, _internal_1.applyUpdate)(obj, node, queries, (o, k) => {
            const prev = o[k];
            o[k] = o[k] === undefined ? 0 : o[k] * val;
            return o[k] !== prev;
        }, { buildGraph: true });
    }));
};
exports.$mul = $mul;
