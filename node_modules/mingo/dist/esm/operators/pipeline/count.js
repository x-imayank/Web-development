import { Lazy } from "../../lazy";
import { assert, isString } from "../../util";
/**
 * Returns a document that contains a count of the number of documents input to the stage.
 *
 * @param {Array} collection
 * @param {String} expr
 * @param {Options} options
 * @return {Object}
 */
export const $count = (collection, expr, _) => {
    assert(isString(expr) &&
        expr.trim() !== "" &&
        expr.indexOf(".") === -1 &&
        expr.trim()[0] !== "$", "Invalid expression value for $count");
    return Lazy([
        {
            [expr]: collection.size()
        }
    ]);
};
