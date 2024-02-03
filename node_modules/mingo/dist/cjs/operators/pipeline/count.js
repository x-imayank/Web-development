"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$count = void 0;
const lazy_1 = require("../../lazy");
const util_1 = require("../../util");
/**
 * Returns a document that contains a count of the number of documents input to the stage.
 *
 * @param {Array} collection
 * @param {String} expr
 * @param {Options} options
 * @return {Object}
 */
const $count = (collection, expr, _) => {
    (0, util_1.assert)((0, util_1.isString)(expr) &&
        expr.trim() !== "" &&
        expr.indexOf(".") === -1 &&
        expr.trim()[0] !== "$", "Invalid expression value for $count");
    return (0, lazy_1.Lazy)([
        {
            [expr]: collection.size()
        }
    ]);
};
exports.$count = $count;
