import { PipelineOperator } from "../../core";
/**
 * Performs a left outer join to another collection in the same database to filter in documents from the “joined” collection for processing.
 *
 * @param collection
 * @param expr
 * @param opt
 */
export declare const $lookup: PipelineOperator;
