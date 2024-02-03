"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateObject = exports.createUpdater = void 0;
const core_1 = require("./core");
const UPDATE_OPERATORS = __importStar(require("./operators/update"));
const query_1 = require("./query");
const util_1 = require("./util");
/**
 * Creates a new updater function with default options.
 * @param defaultOptions The default options. Defaults to no cloning with strict mode off for queries.
 * @returns {Updater}
 */
function createUpdater(defaultOptions) {
    return (obj, expr, arrayFilters = [], conditions = {}, options = {}) => {
        const opts = Object.assign({ cloneMode: "copy" }, defaultOptions, options);
        Object.assign(opts, {
            queryOptions: (0, core_1.initOptions)(Object.assign({ useStrictMode: false }, opts === null || opts === void 0 ? void 0 : opts.queryOptions))
        });
        arrayFilters = arrayFilters || [];
        conditions = conditions || {};
        // validate operator
        const entry = Object.entries(expr);
        // check for single entry
        (0, util_1.assert)(entry.length === 1, "Update expression must contain only one operator.");
        const [op, args] = entry[0];
        // check operator exists
        (0, util_1.assert)((0, util_1.has)(UPDATE_OPERATORS, op), `Update operator '${op}' is not supported.`);
        /*eslint import/namespace: ['error', { allowComputed: true }]*/
        const mutate = UPDATE_OPERATORS[op];
        // validate condition
        if (Object.keys(conditions).length) {
            const q = new query_1.Query(conditions, opts.queryOptions);
            if (!q.test(obj))
                return [];
        }
        // apply updates
        return mutate(obj, args, arrayFilters, opts);
    };
}
exports.createUpdater = createUpdater;
/**
 * Updates the given object with the expression.
 *
 * @param obj The object to update.
 * @param expr The update expressions.
 * @param arrayFilters Filters to apply to nested items.
 * @param conditions Conditions to validate before performing update.
 * @param options Update options to override defaults.
 * @returns {Array<string>} A list of modified field paths in the object.
 */
exports.updateObject = createUpdater({});
