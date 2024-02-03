import { Aggregator } from "../../aggregator";
import { ProcessingMode } from "../../core";
/**
 * Processes multiple aggregation pipelines within a single stage on the same set of input documents.
 * Enables the creation of multi-faceted aggregations capable of characterizing data across multiple dimensions, or facets, in a single stage.
 */
export const $facet = (collection, expr, options) => {
    return collection.transform(((array) => {
        const o = {};
        for (const [k, pipeline] of Object.entries(expr)) {
            o[k] = new Aggregator(pipeline, Object.assign(Object.assign({}, options), { processingMode: ProcessingMode.CLONE_INPUT })).run(array);
        }
        return [o];
    }));
};
