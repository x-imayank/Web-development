"use strict";
// Custom Aggregation Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#custom-aggregation-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$accumulator = void 0;
const core_1 = require("../../core");
const util_1 = require("../../util");
/**
 * Defines a custom accumulator function.
 *
 * @param {Array} collection The input array
 * @param {*} expr The expression for the operator
 * @param {Options} options Options
 */
const $accumulator = (collection, expr, options) => {
    var _a;
    (0, util_1.assert)(!!options && options.scriptEnabled, "$accumulator operator requires 'scriptEnabled' option to be true");
    if (collection.length == 0)
        return expr.initArgs;
    const copts = core_1.ComputeOptions.init(options);
    const initArgs = (0, core_1.computeValue)({}, expr.initArgs || [], null, copts.update(((_a = copts === null || copts === void 0 ? void 0 : copts.local) === null || _a === void 0 ? void 0 : _a.groupId) || {}));
    let state = expr.init.call(null, ...initArgs);
    for (const doc of collection) {
        // get arguments for document
        const args = (0, core_1.computeValue)(doc, expr.accumulateArgs, null, copts.update(doc));
        // update the state with each documents value
        // eslint-disable-next-line
        state = expr.accumulate.call(null, ...[state, ...args]);
    }
    return (expr.finalize ? expr.finalize.call(null, state) : state);
};
exports.$accumulator = $accumulator;
