import { assert, isArray } from "../../util";
import { applyUpdate, walkExpression } from "./_internal";
/** Removes the first or last element of an array. */
export const $pop = (obj, expr, arrayFilters = [], options = {}) => {
    return walkExpression(expr, arrayFilters, options, ((val, node, queries) => {
        return applyUpdate(obj, node, queries, (o, k) => {
            const arr = o[k];
            assert(isArray(arr), `path '${node.selector}' contains an element of non-array type.`);
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
