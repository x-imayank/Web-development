import { has, intersection, isObject, unique } from "../../util";
import { applyUpdate, clone, walkExpression } from "./_internal";
/** Adds a value to an array unless the value is already present. */
export const $addToSet = (obj, expr, arrayFilters = [], options = {}) => {
    return walkExpression(expr, arrayFilters, options, (val, node, queries) => {
        const args = { $each: [val] };
        if (isObject(val) && has(val, "$each")) {
            Object.assign(args, val);
        }
        return applyUpdate(obj, node, queries, (o, k) => {
            const prev = (o[k] || (o[k] = []));
            const common = intersection([prev, args.$each]);
            if (common.length === args.$each.length)
                return false;
            o[k] = clone(options.cloneMode, unique(prev.concat(args.$each)));
            return true;
        }, { buildGraph: true });
    });
};
