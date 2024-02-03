import { compare, has, isEqual, isNumber, isObject, resolve } from "../../util";
import { applyUpdate, clone, walkExpression } from "./_internal";
const OPERATOR_MODIFIERS = Object.freeze([
    "$each",
    "$slice",
    "$sort",
    "$position"
]);
/** Appends a specified value to an array. */
export const $push = (obj, expr, arrayFilters = [], options = {}) => {
    return walkExpression(expr, arrayFilters, options, ((val, node, queries) => {
        const args = {
            $each: [val]
        };
        if (isObject(val) &&
            OPERATOR_MODIFIERS.some(m => has(val, m))) {
            Object.assign(args, val);
        }
        return applyUpdate(obj, node, queries, (o, k) => {
            const arr = (o[k] || (o[k] = []));
            // take a copy of sufficient length.
            const prev = arr.slice(0, args.$slice || arr.length);
            const oldsize = arr.length;
            const pos = isNumber(args.$position) ? args.$position : arr.length;
            // insert new items
            arr.splice(pos, 0, ...clone(options.cloneMode, args.$each));
            if (args.$sort) {
                /* eslint-disable @typescript-eslint/no-unsafe-assignment */
                const sortKey = isObject(args.$sort)
                    ? Object.keys(args.$sort || {}).pop()
                    : "";
                const order = !sortKey ? args.$sort : args.$sort[sortKey];
                const f = !sortKey
                    ? (a) => a
                    : (a) => resolve(a, sortKey);
                arr.sort((a, b) => order * compare(f(a), f(b)));
                /* eslint-enable @typescript-eslint/no-unsafe-assignment */
            }
            // handle slicing
            if (isNumber(args.$slice)) {
                if (args.$slice < 0)
                    arr.splice(0, arr.length + args.$slice);
                else
                    arr.splice(args.$slice);
            }
            // detect change
            return oldsize != arr.length || !isEqual(prev, arr);
        }, { descendArray: true, buildGraph: true });
    }));
};
