import { initOptions } from "./core";
import * as UPDATE_OPERATORS from "./operators/update";
import { Query } from "./query";
import { assert, has } from "./util";
/**
 * Creates a new updater function with default options.
 * @param defaultOptions The default options. Defaults to no cloning with strict mode off for queries.
 * @returns {Updater}
 */
export function createUpdater(defaultOptions) {
    return (obj, expr, arrayFilters = [], conditions = {}, options = {}) => {
        const opts = Object.assign({ cloneMode: "copy" }, defaultOptions, options);
        Object.assign(opts, {
            queryOptions: initOptions(Object.assign({ useStrictMode: false }, opts === null || opts === void 0 ? void 0 : opts.queryOptions))
        });
        arrayFilters = arrayFilters || [];
        conditions = conditions || {};
        // validate operator
        const entry = Object.entries(expr);
        // check for single entry
        assert(entry.length === 1, "Update expression must contain only one operator.");
        const [op, args] = entry[0];
        // check operator exists
        assert(has(UPDATE_OPERATORS, op), `Update operator '${op}' is not supported.`);
        /*eslint import/namespace: ['error', { allowComputed: true }]*/
        const mutate = UPDATE_OPERATORS[op];
        // validate condition
        if (Object.keys(conditions).length) {
            const q = new Query(conditions, opts.queryOptions);
            if (!q.test(obj))
                return [];
        }
        // apply updates
        return mutate(obj, args, arrayFilters, opts);
    };
}
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
export const updateObject = createUpdater({});
