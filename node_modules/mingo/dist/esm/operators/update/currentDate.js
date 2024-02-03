import { applyUpdate, walkExpression } from "./_internal";
/** Sets the value of a field to the current date. */
export const $currentDate = (obj, expr, arrayFilters = [], options = {}) => {
    const now = Date.now();
    return walkExpression(expr, arrayFilters, options, ((_, node, queries) => {
        return applyUpdate(obj, node, queries, (o, k) => {
            o[k] = now;
            return true;
        }, { buildGraph: true });
    }));
};
