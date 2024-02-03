"use strict";
/**
 * String Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#string-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$substrCP = void 0;
const substr_1 = require("./substr");
const $substrCP = (obj, expr, options) => {
    return (0, substr_1.$substr)(obj, expr, options);
};
exports.$substrCP = $substrCP;
