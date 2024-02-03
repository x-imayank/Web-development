import { has, isArray } from "../../util";
import { applyUpdate, walkExpression } from "./_internal";
/** Deletes a particular field */
export const $unset = (obj, expr, arrayFilters = [], options = {}) => {
    return walkExpression(expr, arrayFilters, options, (_, node, queries) => {
        return applyUpdate(obj, node, queries, (o, k) => {
            if (!has(o, k))
                return false;
            if (isArray(o)) {
                o[k] = null;
            }
            else {
                delete o[k];
            }
            return true;
        });
    });
};
