"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$out = void 0;
const util_1 = require("../../util");
/**
 * Takes the documents returned by the aggregation pipeline and writes them to a specified collection.
 *
 * Unlike the $out operator in MongoDB, this operator can appear in any position in the pipeline and is
 * useful for collecting intermediate results of an aggregation operation.
 *
 * Note: Object are deep cloned for outputing regardless of the ProcessingMode.
 *
 * @param collection
 * @param expr
 * @param options
 * @returns {*}
 */
const $out = (collection, expr, options) => {
    const outputColl = (0, util_1.isString)(expr)
        ? options === null || options === void 0 ? void 0 : options.collectionResolver(expr)
        : expr;
    (0, util_1.assert)(outputColl instanceof Array, `expression must resolve to an array`);
    return collection.map((o) => {
        outputColl.push((0, util_1.cloneDeep)(o));
        return o; // passthrough
    });
};
exports.$out = $out;
