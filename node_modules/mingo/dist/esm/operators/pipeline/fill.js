import { initOptions } from "../../core";
import { assert, has, isObject } from "../../util";
import { $ifNull } from "../expression/conditional/ifNull";
import { $linearFill } from "../window/linearFill";
import { $locf } from "../window/locf";
import { $addFields } from "./addFields";
import { $setWindowFields } from "./setWindowFields";
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
export const $fill = (collection, expr, options) => {
    var _a, _b;
    assert(!expr.sortBy || isObject(expr.sortBy), "sortBy must be an object.");
    assert(!!expr.sortBy || Object.values(expr.output).every(m => has(m, "value")), "sortBy required if any output field specifies a 'method'.");
    assert(!(expr.partitionBy && expr.partitionByFields), "specify either partitionBy or partitionByFields.");
    assert(!expr.partitionByFields ||
        ((_a = expr === null || expr === void 0 ? void 0 : expr.partitionByFields) === null || _a === void 0 ? void 0 : _a.every(s => s[0] !== "$")), "fields in partitionByFields cannot begin with '$'.");
    options = initOptions(options);
    options.context.addExpressionOps({ $ifNull });
    options.context.addWindowOps({ $locf, $linearFill });
    const partitionExpr = expr.partitionBy || ((_b = expr === null || expr === void 0 ? void 0 : expr.partitionByFields) === null || _b === void 0 ? void 0 : _b.map(s => `$${s}`));
    // collect and remove all output fields using 'value' instead of 'method'.
    // if there are any fields remaining, process collection using $setWindowFields.
    // if the collected output fields is non-empty, use $addFields to add them to their respective partitions.
    const valueExpr = {};
    const methodExpr = {};
    for (const [k, m] of Object.entries(expr.output)) {
        if (has(m, "value")) {
            // translate to expression for $addFields
            valueExpr[k] = { $ifNull: [`$$CURRENT.${k}`, m["value"]] };
        }
        else {
            // translate to output expression for $setWindowFields.
            const fillOp = FILL_METHODS[m["method"]];
            assert(!!fillOp, `invalid fill method '${m["method"]}'.`);
            methodExpr[k] = { [fillOp]: "$" + k };
        }
    }
    // perform filling with $setWindowFields
    if (Object.keys(methodExpr).length > 0) {
        collection = $setWindowFields(collection, {
            sortBy: expr.sortBy || {},
            partitionBy: partitionExpr,
            output: methodExpr
        }, options);
    }
    // fill with values
    if (Object.keys(valueExpr).length > 0) {
        collection = $addFields(collection, valueExpr, options);
    }
    return collection;
};
