"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$pull = void 0;
const query_1 = require("../../query");
const util_1 = require("../../util");
const _internal_1 = require("./_internal");
/** Removes from an existing array all instances of a value or values that match a specified condition. */
const $pull = (obj, expr, arrayFilters = [], options = {}) => {
    return (0, _internal_1.walkExpression)(expr, arrayFilters, options, ((val, node, queries) => {
        // wrap simple values or condition objects
        const wrap = !(0, util_1.isObject)(val) || Object.keys(val).some(util_1.isOperator);
        const query = new query_1.Query(wrap ? { k: val } : val, options.queryOptions);
        const pred = wrap
            ? (v) => query.test({ k: v })
            : (v) => query.test(v);
        return (0, _internal_1.applyUpdate)(obj, node, queries, (o, k) => {
            const prev = o[k];
            const curr = new Array();
            const found = prev
                .map(v => {
                const b = pred(v);
                if (!b)
                    curr.push(v);
                return b;
            })
                .some(Boolean);
            if (!found)
                return false;
            o[k] = curr;
            return true;
        });
    }));
};
exports.$pull = $pull;
