// Date Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#date-expression-operators
import { computeValue } from "../../../core";
import { $dateAdd } from "./dateAdd";
/**
 * Decrements a Date object by a specified number of time units.
 * @param obj
 * @param expr
 */
export const $dateSubtract = (obj, expr, options) => {
    const amount = computeValue(obj, expr === null || expr === void 0 ? void 0 : expr.amount, null, options);
    return $dateAdd(obj, Object.assign(Object.assign({}, expr), { amount: -1 * amount }), options);
};
