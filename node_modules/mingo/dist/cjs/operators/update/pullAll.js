"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$pullAll = void 0;
const pull_1 = require("./pull");
/** Removes all instances of the specified values from an existing array. */
const $pullAll = (obj, expr, arrayFilters = [], options = {}) => {
    const pullExpr = {};
    Object.entries(expr).forEach(([k, v]) => {
        pullExpr[k] = { $in: v };
    });
    return (0, pull_1.$pull)(obj, pullExpr, arrayFilters, options);
};
exports.$pullAll = $pullAll;
