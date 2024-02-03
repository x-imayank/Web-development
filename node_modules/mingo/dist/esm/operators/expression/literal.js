// Literal Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#literal-expression-operator
/**
 * Return a value without parsing.
 * @param obj
 * @param expr
 * @param options
 */
export const $literal = (_obj, expr, _options) => expr;
