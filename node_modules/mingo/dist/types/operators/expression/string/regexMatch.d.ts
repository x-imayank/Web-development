/**
 * String Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#string-expression-operators
 */
import { ExpressionOperator } from "../../../core";
/**
 * Applies a regular expression (regex) to a string and returns a boolean that indicates if a match is found or not.
 *
 * @param obj
 * @param expr
 */
export declare const $regexMatch: ExpressionOperator;
