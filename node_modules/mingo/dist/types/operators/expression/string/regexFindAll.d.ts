/**
 * String Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#string-expression-operators
 */
import { ExpressionOperator } from "../../../core";
/**
 * Applies a regular expression (regex) to a string and returns information on the all matched substrings.
 *
 * @param obj
 * @param expr
 */
export declare const $regexFindAll: ExpressionOperator;
