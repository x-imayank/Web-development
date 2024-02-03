"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$merge = void 0;
const aggregator_1 = require("../../aggregator");
const core_1 = require("../../core");
const util_1 = require("../../util");
const expression_1 = require("../expression");
/**
 * Writes the resulting documents of the aggregation pipeline to a collection.
 *
 * The stage can incorporate (insert new documents, merge documents, replace documents,
 * keep existing documents, fail the operation, process documents with a custom update pipeline)
 * the results into an output collection. To use the $merge stage, it must be the last stage in the pipeline.
 *
 * Note: Object are deep cloned for outputing regardless of the ProcessingMode.
 *
 * @param collection
 * @param expr
 * @param options
 * @returns {*}
 */
const $merge = (collection, expr, options) => {
    const output = (0, util_1.isString)(expr.into)
        ? options === null || options === void 0 ? void 0 : options.collectionResolver(expr.into)
        : expr.into;
    (0, util_1.assert)(output instanceof Array, `$merge: option 'into' must resolve to an array`);
    const onField = expr.on || options.idKey;
    const getHash = (o) => {
        const val = (0, util_1.isString)(onField)
            ? (0, util_1.resolve)(o, onField)
            : onField.map(s => (0, util_1.resolve)(o, s));
        return (0, util_1.hashCode)(val, options.hashFunction);
    };
    const hash = {};
    // we assuming the lookup expressions are unique
    for (let i = 0; i < output.length; i++) {
        const obj = output[i];
        const k = getHash(obj);
        (0, util_1.assert)(!hash[k], "$merge: 'into' collection must have unique entries for the 'on' field.");
        hash[k] = [obj, i];
    }
    const copts = core_1.ComputeOptions.init(options);
    return collection.map((o) => {
        const k = getHash(o);
        if (hash[k]) {
            const [target, i] = hash[k];
            // compute variables
            const variables = (0, core_1.computeValue)(target, expr.let || { new: "$$ROOT" }, null, 
            // 'root' is the item from the iteration.
            copts.update(o));
            if ((0, util_1.isArray)(expr.whenMatched)) {
                const aggregator = new aggregator_1.Aggregator(expr.whenMatched, Object.assign(Object.assign({}, options), { variables }));
                output[i] = aggregator.run([target])[0];
            }
            else {
                switch (expr.whenMatched) {
                    case "replace":
                        output[i] = o;
                        break;
                    case "fail":
                        throw new Error("$merge: failed due to matching as specified by 'whenMatched' option.");
                    case "keepExisting":
                        break;
                    case "merge":
                    default:
                        output[i] = (0, expression_1.$mergeObjects)(target, [target, o], 
                        // 'root' is the item from the iteration.
                        copts.update(o, { variables }));
                        break;
                }
            }
        }
        else {
            switch (expr.whenNotMatched) {
                case "discard":
                    break;
                case "fail":
                    throw new Error("$merge: failed due to matching as specified by 'whenMatched' option.");
                case "insert":
                default:
                    output.push(o);
                    break;
            }
        }
        return o; // passthrough
    });
};
exports.$merge = $merge;
