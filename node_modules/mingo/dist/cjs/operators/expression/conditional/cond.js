"use strict";
/**
 * Conditional Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#conditional-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$cond = void 0;
const core_1 = require("../../../core");
const util_1 = require("../../../util");
/**
 * A ternary operator that evaluates one expression,
 * and depending on the result returns the value of one following expressions.
 *
 * @param obj
 * @param expr
 */
const $cond = (obj, expr, options) => {
    let ifExpr;
    let thenExpr;
    let elseExpr;
    const errorMsg = "$cond: invalid arguments";
    if (expr instanceof Array) {
        (0, util_1.assert)(expr.length === 3, errorMsg);
        ifExpr = expr[0];
        thenExpr = expr[1];
        elseExpr = expr[2];
    }
    else {
        (0, util_1.assert)((0, util_1.isObject)(expr), errorMsg);
        ifExpr = expr.if;
        thenExpr = expr.then;
        elseExpr = expr.else;
    }
    const condition = (0, util_1.truthy)((0, core_1.computeValue)(obj, ifExpr, null, options), options.useStrictMode);
    return (0, core_1.computeValue)(obj, condition ? thenExpr : elseExpr, null, options);
};
exports.$cond = $cond;
