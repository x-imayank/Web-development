"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$rename = void 0;
const util_1 = require("../../util");
const _internal_1 = require("./_internal");
const set_1 = require("./set");
/** Replaces the value of a field with the specified value. */
const $rename = (obj, expr, arrayFilters = [], options = {}) => {
    const res = [];
    const changed = (0, _internal_1.walkExpression)(expr, arrayFilters, options, ((val, node, queries) => {
        return (0, _internal_1.applyUpdate)(obj, node, queries, (o, k) => {
            if (!(0, util_1.has)(o, k))
                return false;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            res.push(...(0, set_1.$set)(obj, { [val]: o[k] }, arrayFilters, options));
            delete o[k];
            return true;
        });
    }));
    return Array.from(new Set(changed.concat(res)));
};
exports.$rename = $rename;
