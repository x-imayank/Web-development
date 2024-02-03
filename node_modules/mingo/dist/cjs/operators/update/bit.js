"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$bit = void 0;
const util_1 = require("../../util");
const _internal_1 = require("./_internal");
const BIT_OPS = new Set(["and", "or", "xor"]);
/** Performs a bitwise update of a field. The operator supports AND, OR, and XOR.*/
const $bit = (obj, expr, arrayFilters = [], options = {}) => {
    return (0, _internal_1.walkExpression)(expr, arrayFilters, options, ((val, node, queries) => {
        const op = Object.keys(val);
        (0, util_1.assert)(op.length === 1 && BIT_OPS.has(op[0]), `Invalid bit operator '${op[0]}'. Must be one of 'and', 'or', or 'xor'.`);
        return (0, _internal_1.applyUpdate)(obj, node, queries, (o, k) => {
            let n = o[k];
            const v = val[op[0]];
            if (n !== undefined && !((0, util_1.isNumber)(n) && (0, util_1.isNumber)(v)))
                return false;
            n = n || 0;
            switch (op[0]) {
                case "and":
                    o[k] = n & v;
                    break;
                case "or":
                    o[k] = n | v;
                    break;
                case "xor":
                    o[k] = n ^ v;
                    break;
            }
            return o[k] !== n;
        }, { buildGraph: true });
    }));
};
exports.$bit = $bit;
