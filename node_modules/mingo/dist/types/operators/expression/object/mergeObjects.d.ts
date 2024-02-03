import { ExpressionOperator } from "../../../core";
import { RawObject } from "../../../types";
/**
 * Combines multiple documents into a single document.
 *
 * @param {*} obj The target object for this expression
 * @param {*} expr The right-hand side of the operator
 * @param {Options} options Options to use for operation
 */
export declare const $mergeObjects: ExpressionOperator<RawObject>;
