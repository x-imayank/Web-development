"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$currentDate = void 0;
const _internal_1 = require("./_internal");
/** Sets the value of a field to the current date. */
const $currentDate = (obj, expr, arrayFilters = [], options = {}) => {
    const now = Date.now();
    return (0, _internal_1.walkExpression)(expr, arrayFilters, options, ((_, node, queries) => {
        return (0, _internal_1.applyUpdate)(obj, node, queries, (o, k) => {
            o[k] = now;
            return true;
        }, { buildGraph: true });
    }));
};
exports.$currentDate = $currentDate;
