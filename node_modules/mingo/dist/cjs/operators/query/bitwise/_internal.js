"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBitwiseOperator = void 0;
const _predicates_1 = require("../../_predicates");
const createBitwiseOperator = (predicate) => {
    return (0, _predicates_1.createQueryOperator)((value, mask, options) => {
        let b = 0;
        if (mask instanceof Array) {
            for (const n of mask)
                b = b | (1 << n);
        }
        else {
            b = mask;
        }
        return predicate(value & b, b);
    });
};
exports.createBitwiseOperator = createBitwiseOperator;
