"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$unset = void 0;
const util_1 = require("../../util");
const _internal_1 = require("./_internal");
/** Deletes a particular field */
const $unset = (obj, expr, arrayFilters = [], options = {}) => {
    return (0, _internal_1.walkExpression)(expr, arrayFilters, options, (_, node, queries) => {
        return (0, _internal_1.applyUpdate)(obj, node, queries, (o, k) => {
            if (!(0, util_1.has)(o, k))
                return false;
            if ((0, util_1.isArray)(o)) {
                o[k] = null;
            }
            else {
                delete o[k];
            }
            return true;
        });
    });
};
exports.$unset = $unset;
