import { applyUpdate, walkExpression } from "./_internal";
/** Multiply the value of a field by a number. */
export const $mul = (obj, expr, arrayFilters = [], options = {}) => {
    return walkExpression(expr, arrayFilters, options, ((val, node, queries) => {
        return applyUpdate(obj, node, queries, (o, k) => {
            const prev = o[k];
            o[k] = o[k] === undefined ? 0 : o[k] * val;
            return o[k] !== prev;
        }, { buildGraph: true });
    }));
};
