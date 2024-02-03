import { PipelineOperator } from "../../core";
/**
 * Writes the resulting documents of the aggregation pipeline to a collection.
 *
 * The stage can incorporate (insert new documents, merge documents, replace documents,
 * keep existing documents, fail the operation, process documents with a custom update pipeline)
 * the results into an output collection. To use the $merge stage, it must be the last stage in the pipeline.
 *
 * Note: Object are deep cloned for outputing regardless of the ProcessingMode.
 *
 * @param collection
 * @param expr
 * @param options
 * @returns {*}
 */
export declare const $merge: PipelineOperator;
