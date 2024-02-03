import { compare } from "../../util";
import { applyUpdate, walkExpression } from "./_internal";
/** Updates the value of the field to a specified value if the specified value is greater than the current value of the field. */
export const $max = (obj, expr, arrayFilters = [], options = {}) => {
    return walkExpression(expr, arrayFilters, options, ((val, node, queries) => {
        // If the field does not exist, the $max operator sets the field to the specified value.
        return applyUpdate(obj, node, queries, (o, k) => {
            if (o[k] !== undefined && compare(o[k], val) > -1)
                return false;
            o[k] = val;
            return true;
        }, { buildGraph: true });
    }));
};
