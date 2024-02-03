/**
 * Type Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#type-expression-operators
 */
import { ExpressionOperator } from "../../../core";
/**
 * Converts a value to a double. If the value cannot be converted to an double, $toDouble errors. If the value is null or missing, $toDouble returns null.
 *
 * @param obj
 * @param expr
 */
export declare const $toDouble: ExpressionOperator;
