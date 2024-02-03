"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$unset = void 0;
const util_1 = require("../../util");
const project_1 = require("./project");
/**
 * Removes/excludes fields from documents.
 *
 * @param collection
 * @param expr
 * @param options
 * @returns {Iterator}
 */
const $unset = (collection, expr, options) => {
    expr = (0, util_1.ensureArray)(expr);
    const doc = {};
    for (const k of expr)
        doc[k] = 0;
    return (0, project_1.$project)(collection, doc, options);
};
exports.$unset = $unset;
