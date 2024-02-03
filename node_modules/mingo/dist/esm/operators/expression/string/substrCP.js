/**
 * String Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#string-expression-operators
 */
import { $substr } from "./substr";
export const $substrCP = (obj, expr, options) => {
    return $substr(obj, expr, options);
};
