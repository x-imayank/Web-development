"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rank = exports.withMemo = exports.MILLIS_PER_UNIT = void 0;
const util_1 = require("../../util");
const accumulator_1 = require("../accumulator");
const _internal_1 = require("../expression/date/_internal");
const _internal_2 = require("../pipeline/_internal");
// millis map to diffirent time units
exports.MILLIS_PER_UNIT = {
    week: _internal_1.MILLIS_PER_DAY * 7,
    day: _internal_1.MILLIS_PER_DAY,
    hour: _internal_1.MILLIS_PER_DAY / 24,
    minute: 60000,
    second: 1000,
    millisecond: 1
};
// internal cache to store precomputed series once to avoid O(N^2) calls to over the collection
const memo = new WeakMap();
/**
 * Caches all computed values in a window sequence for reuse.
 * This is only useful for operations with unbounded documents.
 */
function withMemo(collection, expr, cacheFn, fn) {
    // no caching done for bounded inputs
    if (!(0, _internal_2.isUnbounded)(expr.parentExpr.output[expr.field].window)) {
        return fn(cacheFn());
    }
    // first time using collection
    if (!memo.has(collection)) {
        memo.set(collection, { [expr.field]: cacheFn() });
    }
    const data = memo.get(collection);
    // subsequent computations over the same collection.
    if (data[expr.field] === undefined) {
        data[expr.field] = cacheFn();
    }
    let failed = false;
    try {
        return fn(data[expr.field]);
    }
    catch (e) {
        failed = true;
    }
    finally {
        // cleanup on failure or last element in collection.
        if (failed || expr.documentNumber === collection.length) {
            delete data[expr.field];
            if (Object.keys(data).length === 0)
                memo.delete(collection);
        }
    }
}
exports.withMemo = withMemo;
/** Returns the position of a document in the $setWindowFields stage partition. */
function rank(_, collection, expr, options, dense) {
    return withMemo(collection, expr, () => {
        const sortKey = "$" + Object.keys(expr.parentExpr.sortBy)[0];
        const values = (0, accumulator_1.$push)(collection, sortKey, options);
        const groups = (0, util_1.groupBy)(values, ((_, n) => values[n]), options.hashFunction);
        return { values, groups };
    }, input => {
        const { values, groups: partitions } = input;
        // same number of paritions as length means all sort keys are unique
        if (partitions.size == collection.length) {
            return expr.documentNumber;
        }
        const current = values[expr.documentNumber - 1];
        let i = 0;
        let offset = 0;
        // partition keys are already dense so just return the value on match
        for (const key of partitions.keys()) {
            if ((0, util_1.isEqual)(current, key)) {
                return dense ? i + 1 : offset + 1;
            }
            i++;
            offset += partitions.get(key).length;
        }
        // should be unreachable
        throw new Error("rank: invalid return value. please submit a bug report.");
    });
}
exports.rank = rank;
