import { $pull } from "./pull";
/** Removes all instances of the specified values from an existing array. */
export const $pullAll = (obj, expr, arrayFilters = [], options = {}) => {
    const pullExpr = {};
    Object.entries(expr).forEach(([k, v]) => {
        pullExpr[k] = { $in: v };
    });
    return $pull(obj, pullExpr, arrayFilters, options);
};
