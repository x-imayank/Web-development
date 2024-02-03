"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$redact = void 0;
const core_1 = require("../../core");
/**
 * Restricts the contents of the documents based on information stored in the documents themselves.
 *
 * https://docs.mongodb.com/manual/reference/operator/aggregation/redact/
 */
const $redact = (collection, expr, options) => {
    const copts = core_1.ComputeOptions.init(options);
    return collection.map(((obj) => (0, core_1.redact)(obj, expr, copts.update(obj))));
};
exports.$redact = $redact;
