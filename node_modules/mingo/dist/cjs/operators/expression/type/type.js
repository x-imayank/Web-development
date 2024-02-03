"use strict";
/**
 * Type Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#type-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$type = void 0;
const core_1 = require("../../../core");
const util_1 = require("../../../util");
const $type = (obj, expr, options) => {
    const val = (0, core_1.computeValue)(obj, expr, null, options);
    const typename = (0, util_1.getType)(val);
    const nativeType = typename.toLowerCase();
    switch (nativeType) {
        case "boolean":
            return "bool";
        case "number":
            if (val.toString().indexOf(".") >= 0)
                return "double";
            return val >= util_1.MIN_INT && val <= util_1.MAX_INT ? "int" : "long";
        case "regexp":
            return "regex";
        default:
            return nativeType;
    }
};
exports.$type = $type;
