"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$lookup = void 0;
const util_1 = require("../../util");
/**
 * Performs a left outer join to another collection in the same database to filter in documents from the “joined” collection for processing.
 *
 * @param collection
 * @param expr
 * @param opt
 */
const $lookup = (collection, expr, options) => {
    const joinColl = (0, util_1.isString)(expr.from)
        ? options === null || options === void 0 ? void 0 : options.collectionResolver(expr.from)
        : expr.from;
    (0, util_1.assert)(joinColl instanceof Array, `'from' field must resolve to an array`);
    const hash = {};
    for (const obj of joinColl) {
        const k = (0, util_1.hashCode)((0, util_1.resolve)(obj, expr.foreignField), options === null || options === void 0 ? void 0 : options.hashFunction);
        hash[k] = hash[k] || [];
        hash[k].push(obj);
    }
    return collection.map((obj) => {
        const k = (0, util_1.hashCode)((0, util_1.resolve)(obj, expr.localField), options === null || options === void 0 ? void 0 : options.hashFunction);
        const newObj = (0, util_1.into)({}, obj);
        newObj[expr.as] = hash[k] || [];
        return newObj;
    });
};
exports.$lookup = $lookup;
