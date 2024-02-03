import { Query } from "../../query";
import { isObject, isOperator } from "../../util";
import { applyUpdate, walkExpression } from "./_internal";
/** Removes from an existing array all instances of a value or values that match a specified condition. */
export const $pull = (obj, expr, arrayFilters = [], options = {}) => {
    return walkExpression(expr, arrayFilters, options, ((val, node, queries) => {
        // wrap simple values or condition objects
        const wrap = !isObject(val) || Object.keys(val).some(isOperator);
        const query = new Query(wrap ? { k: val } : val, options.queryOptions);
        const pred = wrap
            ? (v) => query.test({ k: v })
            : (v) => query.test(v);
        return applyUpdate(obj, node, queries, (o, k) => {
            const prev = o[k];
            const curr = new Array();
            const found = prev
                .map(v => {
                const b = pred(v);
                if (!b)
                    curr.push(v);
                return b;
            })
                .some(Boolean);
            if (!found)
                return false;
            o[k] = curr;
            return true;
        });
    }));
};
