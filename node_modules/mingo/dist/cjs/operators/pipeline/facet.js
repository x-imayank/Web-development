"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$facet = void 0;
const aggregator_1 = require("../../aggregator");
const core_1 = require("../../core");
/**
 * Processes multiple aggregation pipelines within a single stage on the same set of input documents.
 * Enables the creation of multi-faceted aggregations capable of characterizing data across multiple dimensions, or facets, in a single stage.
 */
const $facet = (collection, expr, options) => {
    return collection.transform(((array) => {
        const o = {};
        for (const [k, pipeline] of Object.entries(expr)) {
            o[k] = new aggregator_1.Aggregator(pipeline, Object.assign(Object.assign({}, options), { processingMode: core_1.ProcessingMode.CLONE_INPUT })).run(array);
        }
        return [o];
    }));
};
exports.$facet = $facet;
