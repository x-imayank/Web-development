"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$group = void 0;
const core_1 = require("../../core");
const util_1 = require("../../util");
// lookup key for grouping
const ID_KEY = "_id";
/**
 * Groups documents together for the purpose of calculating aggregate values based on a collection of documents.
 *
 * @param collection
 * @param expr
 * @param options
 * @returns {Array}
 */
const $group = (collection, expr, options) => {
    (0, util_1.assert)((0, util_1.has)(expr, ID_KEY), "a group specification must include an _id");
    const idExpr = expr[ID_KEY];
    const copts = core_1.ComputeOptions.init(options);
    return collection.transform(((coll) => {
        const partitions = (0, util_1.groupBy)(coll, obj => (0, core_1.computeValue)(obj, idExpr, null, options), options.hashFunction);
        // remove the group key
        expr = Object.assign({}, expr);
        delete expr[ID_KEY];
        let i = -1;
        const partitionKeys = Array.from(partitions.keys());
        const size = partitions.size;
        return () => {
            if (++i === size)
                return { done: true };
            const groupId = partitionKeys[i];
            const obj = {};
            // exclude undefined key value
            if (groupId !== undefined) {
                obj[ID_KEY] = groupId;
            }
            // compute remaining keys in expression
            for (const [key, val] of Object.entries(expr)) {
                obj[key] = (0, core_1.computeValue)(partitions.get(groupId), val, key, copts.update(null, { groupId }));
            }
            return { value: obj, done: false };
        };
    }));
};
exports.$group = $group;
