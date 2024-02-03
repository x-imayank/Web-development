"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$push = void 0;
const util_1 = require("../../util");
const _internal_1 = require("./_internal");
const OPERATOR_MODIFIERS = Object.freeze([
    "$each",
    "$slice",
    "$sort",
    "$position"
]);
/** Appends a specified value to an array. */
const $push = (obj, expr, arrayFilters = [], options = {}) => {
    return (0, _internal_1.walkExpression)(expr, arrayFilters, options, ((val, node, queries) => {
        const args = {
            $each: [val]
        };
        if ((0, util_1.isObject)(val) &&
            OPERATOR_MODIFIERS.some(m => (0, util_1.has)(val, m))) {
            Object.assign(args, val);
        }
        return (0, _internal_1.applyUpdate)(obj, node, queries, (o, k) => {
            const arr = (o[k] || (o[k] = []));
            // take a copy of sufficient length.
            const prev = arr.slice(0, args.$slice || arr.length);
            const oldsize = arr.length;
            const pos = (0, util_1.isNumber)(args.$position) ? args.$position : arr.length;
            // insert new items
            arr.splice(pos, 0, ...(0, _internal_1.clone)(options.cloneMode, args.$each));
            if (args.$sort) {
                /* eslint-disable @typescript-eslint/no-unsafe-assignment */
                const sortKey = (0, util_1.isObject)(args.$sort)
                    ? Object.keys(args.$sort || {}).pop()
                    : "";
                const order = !sortKey ? args.$sort : args.$sort[sortKey];
                const f = !sortKey
                    ? (a) => a
                    : (a) => (0, util_1.resolve)(a, sortKey);
                arr.sort((a, b) => order * (0, util_1.compare)(f(a), f(b)));
                /* eslint-enable @typescript-eslint/no-unsafe-assignment */
            }
            // handle slicing
            if ((0, util_1.isNumber)(args.$slice)) {
                if (args.$slice < 0)
                    arr.splice(0, arr.length + args.$slice);
                else
                    arr.splice(args.$slice);
            }
            // detect change
            return oldsize != arr.length || !(0, util_1.isEqual)(prev, arr);
        }, { descendArray: true, buildGraph: true });
    }));
};
exports.$push = $push;
