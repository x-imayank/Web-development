import { has } from "../../util";
import { applyUpdate, walkExpression } from "./_internal";
import { $set } from "./set";
/** Replaces the value of a field with the specified value. */
export const $rename = (obj, expr, arrayFilters = [], options = {}) => {
    const res = [];
    const changed = walkExpression(expr, arrayFilters, options, ((val, node, queries) => {
        return applyUpdate(obj, node, queries, (o, k) => {
            if (!has(o, k))
                return false;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            res.push(...$set(obj, { [val]: o[k] }, arrayFilters, options));
            delete o[k];
            return true;
        });
    }));
    return Array.from(new Set(changed.concat(res)));
};
