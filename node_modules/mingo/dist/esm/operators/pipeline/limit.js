/**
 * Restricts the number of documents in an aggregation pipeline.
 *
 * @param collection
 * @param value
 * @param options
 * @returns {Object|*}
 */
export const $limit = (collection, expr, options) => {
    return collection.take(expr);
};
