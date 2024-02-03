import { assert, isNumber, resolve } from "../../util";
import { applyUpdate, walkExpression } from "./_internal";
/** Increments a field by a specified value. */
export const $inc = (obj, expr, arrayFilters = [], options = {}) => {
    return walkExpression(expr, arrayFilters, options, (val, node, queries) => {
        if (!node.child) {
            const n = resolve(obj, node.parent);
            assert(n === undefined || isNumber(n), `cannot apply $inc to a value of non-numeric type`);
        }
        return applyUpdate(obj, node, queries, (o, k) => {
            o[k] = (o[k] || (o[k] = 0)) + val;
            return true;
        }, { buildGraph: true });
    });
};
