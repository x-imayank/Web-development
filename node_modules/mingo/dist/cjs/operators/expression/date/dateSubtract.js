"use strict";
// Date Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#date-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$dateSubtract = void 0;
const core_1 = require("../../../core");
const dateAdd_1 = require("./dateAdd");
/**
 * Decrements a Date object by a specified number of time units.
 * @param obj
 * @param expr
 */
const $dateSubtract = (obj, expr, options) => {
    const amount = (0, core_1.computeValue)(obj, expr === null || expr === void 0 ? void 0 : expr.amount, null, options);
    return (0, dateAdd_1.$dateAdd)(obj, Object.assign(Object.assign({}, expr), { amount: -1 * amount }), options);
};
exports.$dateSubtract = $dateSubtract;
