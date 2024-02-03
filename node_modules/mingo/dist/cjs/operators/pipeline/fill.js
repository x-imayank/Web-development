"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$fill = void 0;
const core_1 = require("../../core");
const util_1 = require("../../util");
const ifNull_1 = require("../expression/conditional/ifNull");
const linearFill_1 = require("../window/linearFill");
const locf_1 = require("../window/locf");
const addFields_1 = require("./addFields");
const setWindowFields_1 = require("./setWindowFields");
const FILL_METHODS = {
    locf: "$locf",
    linear: "$linearFill"
};
/**
 * Populates null and missing field values within documents.
 *
 * @param {Iterator} collection
 * @param {Object} expr
 * @param {Options} options
 */
const $fill = (collection, expr, options) => {
    var _a, _b;
    (0, util_1.assert)(!expr.sortBy || (0, util_1.isObject)(expr.sortBy), "sortBy must be an object.");
    (0, util_1.assert)(!!expr.sortBy || Object.values(expr.output).every(m => (0, util_1.has)(m, "value")), "sortBy required if any output field specifies a 'method'.");
    (0, util_1.assert)(!(expr.partitionBy && expr.partitionByFields), "specify either partitionBy or partitionByFields.");
    (0, util_1.assert)(!expr.partitionByFields ||
        ((_a = expr === null || expr === void 0 ? void 0 : expr.partitionByFields) === null || _a === void 0 ? void 0 : _a.every(s => s[0] !== "$")), "fields in partitionByFields cannot begin with '$'.");
    options = (0, core_1.initOptions)(options);
    options.context.addExpressionOps({ $ifNull: ifNull_1.$ifNull });
    options.context.addWindowOps({ $locf: locf_1.$locf, $linearFill: linearFill_1.$linearFill });
    const partitionExpr = expr.partitionBy || ((_b = expr === null || expr === void 0 ? void 0 : expr.partitionByFields) === null || _b === void 0 ? void 0 : _b.map(s => `$${s}`));
    // collect and remove all output fields using 'value' instead of 'method'.
    // if there are any fields remaining, process collection using $setWindowFields.
    // if the collected output fields is non-empty, use $addFields to add them to their respective partitions.
    const valueExpr = {};
    const methodExpr = {};
    for (const [k, m] of Object.entries(expr.output)) {
        if ((0, util_1.has)(m, "value")) {
            // translate to expression for $addFields
            valueExpr[k] = { $ifNull: [`$$CURRENT.${k}`, m["value"]] };
        }
        else {
            // translate to output expression for $setWindowFields.
            const fillOp = FILL_METHODS[m["method"]];
            (0, util_1.assert)(!!fillOp, `invalid fill method '${m["method"]}'.`);
            methodExpr[k] = { [fillOp]: "$" + k };
        }
    }
    // perform filling with $setWindowFields
    if (Object.keys(methodExpr).length > 0) {
        collection = (0, setWindowFields_1.$setWindowFields)(collection, {
            sortBy: expr.sortBy || {},
            partitionBy: partitionExpr,
            output: methodExpr
        }, options);
    }
    // fill with values
    if (Object.keys(valueExpr).length > 0) {
        collection = (0, addFields_1.$addFields)(collection, valueExpr, options);
    }
    return collection;
};
exports.$fill = $fill;
