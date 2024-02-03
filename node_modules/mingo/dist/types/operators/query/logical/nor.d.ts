import { QueryOperator } from "../../../core";
/**
 * Joins query clauses with a logical NOR returns all documents that fail to match both clauses.
 *
 * @param selector
 * @param rhs
 * @returns {Function}
 */
export declare const $nor: QueryOperator;
