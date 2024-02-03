/**
 * Conditional Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#conditional-expression-operators
 */
import { ExpressionOperator } from "../../../core";
/**
 * Evaluates an expression and returns the first non-null value.
 *
 * @param obj
 * @param expr
 * @returns {*}
 */
export declare const $ifNull: ExpressionOperator;
