"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$bucket = void 0;
const core_1 = require("../../core");
const lazy_1 = require("../../lazy");
const util_1 = require("../../util");
/**
 * Categorizes incoming documents into groups, called buckets, based on a specified expression and bucket boundaries.
 * https://docs.mongodb.com/manual/reference/operator/aggregation/bucket/
 *
 * @param {*} collection
 * @param {*} expr
 * @param {Options} opt Pipeline options
 */
const $bucket = (collection, expr, options) => {
    const boundaries = [...expr.boundaries];
    const defaultKey = expr.default;
    const lower = boundaries[0]; // inclusive
    const upper = boundaries[boundaries.length - 1]; // exclusive
    const outputExpr = expr.output || { count: { $sum: 1 } };
    (0, util_1.assert)(expr.boundaries.length > 2, "$bucket 'boundaries' expression must have at least 3 elements");
    const boundType = (0, util_1.getType)(lower);
    for (let i = 0, len = boundaries.length - 1; i < len; i++) {
        (0, util_1.assert)(boundType === (0, util_1.getType)(boundaries[i + 1]), "$bucket 'boundaries' must all be of the same type");
        (0, util_1.assert)((0, util_1.compare)(boundaries[i], boundaries[i + 1]) < 0, "$bucket 'boundaries' must be sorted in ascending order");
    }
    !(0, util_1.isNil)(defaultKey) &&
        (0, util_1.getType)(expr.default) === (0, util_1.getType)(lower) &&
        (0, util_1.assert)((0, util_1.compare)(expr.default, upper) >= 0 || (0, util_1.compare)(expr.default, lower) < 0, "$bucket 'default' expression must be out of boundaries range");
    const grouped = {};
    for (const k of boundaries) {
        grouped[k] = [];
    }
    // add default key if provided
    if (!(0, util_1.isNil)(defaultKey))
        grouped[defaultKey] = [];
    let iterator;
    return (0, lazy_1.Lazy)(() => {
        if (!iterator) {
            collection.each(((obj) => {
                const key = (0, core_1.computeValue)(obj, expr.groupBy, null, options);
                if ((0, util_1.isNil)(key) || (0, util_1.compare)(key, lower) < 0 || (0, util_1.compare)(key, upper) >= 0) {
                    (0, util_1.assert)(!(0, util_1.isNil)(defaultKey), "$bucket require a default for out of range values");
                    grouped[defaultKey].push(obj);
                }
                else {
                    (0, util_1.assert)((0, util_1.compare)(key, lower) >= 0 && (0, util_1.compare)(key, upper) < 0, "$bucket 'groupBy' expression must resolve to a value in range of boundaries");
                    const index = (0, util_1.findInsertIndex)(boundaries, key);
                    const boundKey = boundaries[Math.max(0, index - 1)];
                    grouped[boundKey].push(obj);
                }
            }));
            // upper bound is exclusive so we remove it
            boundaries.pop();
            if (!(0, util_1.isNil)(defaultKey))
                boundaries.push(defaultKey);
            iterator = (0, lazy_1.Lazy)(boundaries).map(((key) => {
                const acc = (0, core_1.computeValue)(grouped[key], outputExpr, null, options);
                return (0, util_1.into)(acc, { _id: key });
            }));
        }
        return iterator.next();
    });
};
exports.$bucket = $bucket;
