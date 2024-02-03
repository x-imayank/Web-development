"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$match = void 0;
const query_1 = require("../../query");
/**
 * Filters the document stream, and only allows matching documents to pass into the next pipeline stage.
 * $match uses standard MongoDB queries.
 *
 * @param collection
 * @param expr
 * @param options
 * @returns {Array|*}
 */
const $match = (collection, expr, options) => {
    const q = new query_1.Query(expr, options);
    return collection.filter((o) => q.test(o));
};
exports.$match = $match;
