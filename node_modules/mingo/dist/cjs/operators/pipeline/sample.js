"use strict";
// $sample operator -  https://docs.mongodb.com/manual/reference/operator/aggregation/sample/
Object.defineProperty(exports, "__esModule", { value: true });
exports.$sample = void 0;
/**
 * Randomly selects the specified number of documents from its input. The given iterator must have finite values
 *
 * @param  {Iterator} collection
 * @param  {Object} expr
 * @param  {Options} _options
 * @return {*}
 */
const $sample = (collection, expr, _options) => {
    return collection.transform(((xs) => {
        const len = xs.length;
        let i = -1;
        return () => {
            if (++i === expr.size)
                return { done: true };
            const n = Math.floor(Math.random() * len);
            return { value: xs[n], done: false };
        };
    }));
};
exports.$sample = $sample;
