"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$addFields = void 0;
const core_1 = require("../../core");
const util_1 = require("../../util");
/**
 * Adds new fields to documents.
 * Outputs documents that contain all existing fields from the input documents and newly added fields.
 *
 * @param {Iterator} collection
 * @param {Object} expr
 * @param {Options} options
 */
const $addFields = (collection, expr, options) => {
    const newFields = Object.keys(expr);
    if (newFields.length === 0)
        return collection;
    return collection.map(((obj) => {
        const newObj = Object.assign({}, obj);
        for (const field of newFields) {
            const newValue = (0, core_1.computeValue)(obj, expr[field], null, options);
            if (newValue !== undefined) {
                (0, util_1.setValue)(newObj, field, newValue);
            }
            else {
                (0, util_1.removeValue)(newObj, field);
            }
        }
        return newObj;
    }));
};
exports.$addFields = $addFields;
