"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$unionWith = void 0;
const aggregator_1 = require("../../aggregator");
const lazy_1 = require("../../lazy");
const util_1 = require("../../util");
/**
 * Performs a union of two collections.
 *
 * @param collection
 * @param expr
 * @param opt
 */
const $unionWith = (collection, expr, options) => {
    const array = (0, util_1.isString)(expr.coll)
        ? options.collectionResolver(expr.coll)
        : expr.coll;
    const iterators = [collection];
    iterators.push(expr.pipeline
        ? new aggregator_1.Aggregator(expr.pipeline, options).stream(array)
        : (0, lazy_1.Lazy)(array));
    return (0, lazy_1.compose)(...iterators);
};
exports.$unionWith = $unionWith;
