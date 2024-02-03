"use strict";
/**
 * Conditional Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#conditional-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$switch = void 0;
const core_1 = require("../../../core");
const util_1 = require("../../../util");
/**
 * An operator that evaluates a series of case expressions. When it finds an expression which
 * evaluates to true, it returns the resulting expression for that case. If none of the cases
 * evaluate to true, it returns the default expression.
 *
 * @param obj
 * @param expr
 */
const $switch = (obj, expr, options) => {
    let thenExpr = null;
    // Array.prototype.find not supported in IE, hence the '.some()' proxy
    expr.branches.some((b) => {
        const condition = (0, util_1.truthy)((0, core_1.computeValue)(obj, b.case, null, options), options.useStrictMode);
        if (condition)
            thenExpr = b.then;
        return condition;
    });
    return (0, core_1.computeValue)(obj, thenExpr !== null ? thenExpr : expr.default, null, options);
};
exports.$switch = $switch;
