"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$unwind = void 0;
const lazy_1 = require("../../lazy");
const util_1 = require("../../util");
/**
 * Takes an array of documents and returns them as a stream of documents.
 *
 * @param collection
 * @param expr
 * @param options
 * @returns {Array}
 */
const $unwind = (collection, expr, _options) => {
    if ((0, util_1.isString)(expr))
        expr = { path: expr };
    const path = expr.path;
    const field = path.substring(1);
    const includeArrayIndex = (expr === null || expr === void 0 ? void 0 : expr.includeArrayIndex) || false;
    const preserveNullAndEmptyArrays = expr.preserveNullAndEmptyArrays || false;
    const format = (o, i) => {
        if (includeArrayIndex !== false)
            o[includeArrayIndex] = i;
        return o;
    };
    let value;
    return (0, lazy_1.Lazy)(() => {
        for (;;) {
            // take from lazy sequence if available
            if (value instanceof lazy_1.Iterator) {
                const tmp = value.next();
                if (!tmp.done)
                    return tmp;
            }
            // fetch next object
            const wrapper = collection.next();
            if (wrapper.done)
                return wrapper;
            // unwrap value
            const obj = wrapper.value;
            // get the value of the field to unwind
            value = (0, util_1.resolve)(obj, field);
            // throw error if value is not an array???
            if (value instanceof Array) {
                if (value.length === 0 && preserveNullAndEmptyArrays === true) {
                    value = null; // reset unwind value
                    (0, util_1.removeValue)(obj, field);
                    return { value: format(obj, null), done: false };
                }
                else {
                    // construct a lazy sequence for elements per value
                    value = (0, lazy_1.Lazy)(value).map(((item, i) => {
                        const newObj = (0, util_1.resolveGraph)(obj, field, {
                            preserveKeys: true
                        });
                        (0, util_1.setValue)(newObj, field, item);
                        return format(newObj, i);
                    }));
                }
            }
            else if (!(0, util_1.isEmpty)(value) || preserveNullAndEmptyArrays === true) {
                return { value: format(obj, null), done: false };
            }
        }
    });
};
exports.$unwind = $unwind;
