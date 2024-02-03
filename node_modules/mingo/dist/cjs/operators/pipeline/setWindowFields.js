"use strict";
// $setWindowFields -  https://docs.mongodb.com/manual/reference/operator/aggregation/setWindowFields/
Object.defineProperty(exports, "__esModule", { value: true });
exports.$setWindowFields = void 0;
const core_1 = require("../../core");
const lazy_1 = require("../../lazy");
const util_1 = require("../../util");
const function_1 = require("../expression/custom/function");
const dateAdd_1 = require("../expression/date/dateAdd");
const _internal_1 = require("./_internal");
const addFields_1 = require("./addFields");
const group_1 = require("./group");
const sort_1 = require("./sort");
// Operators that require 'sortBy' option.
const SORT_REQUIRED_OPS = new Set([
    "$denseRank",
    "$documentNumber",
    "$first",
    "$last",
    "$linearFill",
    "$rank",
    "$shift"
]);
// Operators that require unbounded 'window' option.
const WINDOW_UNBOUNDED_OPS = new Set([
    "$denseRank",
    "$expMovingAvg",
    "$linearFill",
    "$locf",
    "$rank",
    "$shift"
]);
/**
 * Randomly selects the specified number of documents from its input. The given iterator must have finite values
 *
 * @param  {Iterator} collection
 * @param  {Object} expr
 * @param  {Options} options
 * @return {*}
 */
const $setWindowFields = (collection, expr, options) => {
    options = (0, core_1.initOptions)(options);
    options.context.addExpressionOps({ $function: function_1.$function });
    // validate inputs early since this can be an expensive operation.
    for (const outputExpr of Object.values(expr.output)) {
        const keys = Object.keys(outputExpr);
        const op = keys.find(util_1.isOperator);
        (0, util_1.assert)(!!(0, core_1.getOperator)(core_1.OperatorType.WINDOW, op, options) ||
            !!(0, core_1.getOperator)(core_1.OperatorType.ACCUMULATOR, op, options), `'${op}' is not a valid window operator`);
        (0, util_1.assert)(keys.length > 0 &&
            keys.length <= 2 &&
            (keys.length == 1 || keys.includes("window")), "'output' option should have a single window operator.");
        if (outputExpr === null || outputExpr === void 0 ? void 0 : outputExpr.window) {
            const { documents, range } = outputExpr.window;
            (0, util_1.assert)((!!documents && !range) ||
                (!documents && !!range) ||
                (!documents && !range), "'window' option supports only one of 'documents' or 'range'.");
        }
    }
    // we sort first if required
    if (expr.sortBy) {
        collection = (0, sort_1.$sort)(collection, expr.sortBy, options);
    }
    // then partition collection
    collection = (0, group_1.$group)(collection, {
        _id: expr.partitionBy,
        items: { $push: "$$CURRENT" }
    }, options);
    // transform values
    return collection.transform(((partitions) => {
        // let iteratorIndex = 0;
        const iterators = [];
        const outputConfig = [];
        for (const [field, outputExpr] of Object.entries(expr.output)) {
            const op = Object.keys(outputExpr).find(util_1.isOperator);
            const config = {
                operatorName: op,
                func: {
                    left: (0, core_1.getOperator)(core_1.OperatorType.ACCUMULATOR, op, options),
                    right: (0, core_1.getOperator)(core_1.OperatorType.WINDOW, op, options)
                },
                args: outputExpr[op],
                field: field,
                window: outputExpr.window
            };
            // sortBy option required for specific operators or bounded window.
            (0, util_1.assert)(!!expr.sortBy || !(SORT_REQUIRED_OPS.has(op) || !config.window), `${SORT_REQUIRED_OPS.has(op) ? `'${op}'` : "bounded window operation"} requires a sortBy.`);
            // window must be unbounded for specific operators.
            (0, util_1.assert)(!config.window || !WINDOW_UNBOUNDED_OPS.has(op), `${op} does not accept a 'window' field.`);
            outputConfig.push(config);
        }
        // each parition maintains its own closure to process the documents in the window.
        partitions.forEach(((group) => {
            // get the items to process
            const items = group.items;
            // create an iterator per group.
            // we need the index of each document so we track it using a special field.
            let iterator = (0, lazy_1.Lazy)(items);
            // results map
            const windowResultMap = {};
            for (const config of outputConfig) {
                const { func, args, field, window } = config;
                const makeResultFunc = (getItemsFn) => {
                    // closure for object index within the partition
                    let index = -1;
                    return (obj) => {
                        ++index;
                        // process accumulator function
                        if (func.left) {
                            return func.left(getItemsFn(obj, index), args, options);
                        }
                        else if (func.right) {
                            // OR process 'window' function
                            return func.right(obj, getItemsFn(obj, index), {
                                parentExpr: expr,
                                inputExpr: args,
                                documentNumber: index + 1,
                                field
                            }, 
                            // must use raw options only since it operates over a collection.
                            options);
                        }
                    };
                };
                if (window) {
                    const { documents, range, unit } = window;
                    // TODO: fix the meaning of numeric values in range.
                    //  See definition: https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#std-label-setWindowFields-range
                    //  - A number to add to the value of the sortBy field for the current document.
                    //  - A document is in the window if the sortBy field value is inclusively within the lower and upper boundaries.
                    // TODO: Need to reconcile the two above statments from the doc to implement 'range' option correctly.
                    const boundary = documents || range;
                    if (!(0, _internal_1.isUnbounded)(window)) {
                        const [begin, end] = boundary;
                        const toBeginIndex = (currentIndex) => {
                            if (begin == "current")
                                return currentIndex;
                            if (begin == "unbounded")
                                return 0;
                            return Math.max(begin + currentIndex, 0);
                        };
                        const toEndIndex = (currentIndex) => {
                            if (end == "current")
                                return currentIndex + 1;
                            if (end == "unbounded")
                                return items.length;
                            return end + currentIndex + 1;
                        };
                        const getItems = (current, index) => {
                            // handle string boundaries or documents
                            if (!!documents || boundary.every(util_1.isString)) {
                                return items.slice(toBeginIndex(index), toEndIndex(index));
                            }
                            // handle range with numeric boundary values
                            const sortKey = Object.keys(expr.sortBy)[0];
                            let lower;
                            let upper;
                            if (unit) {
                                // we are dealing with datetimes
                                const getTime = (amount) => {
                                    return (0, dateAdd_1.$dateAdd)(current, {
                                        startDate: new Date(current[sortKey]),
                                        unit,
                                        amount
                                    }, options).getTime();
                                };
                                lower = (0, util_1.isNumber)(begin) ? getTime(begin) : -Infinity;
                                upper = (0, util_1.isNumber)(end) ? getTime(end) : Infinity;
                            }
                            else {
                                const currentValue = current[sortKey];
                                lower = (0, util_1.isNumber)(begin) ? currentValue + begin : -Infinity;
                                upper = (0, util_1.isNumber)(end) ? currentValue + end : Infinity;
                            }
                            let array = items;
                            if (begin == "current")
                                array = items.slice(index);
                            if (end == "current")
                                array = items.slice(0, index + 1);
                            // look within the boundary and filter down
                            return array.filter((o) => {
                                const n = +o[sortKey];
                                return n >= lower && n <= upper;
                            });
                        };
                        windowResultMap[field] = makeResultFunc(getItems);
                    }
                }
                // default action is to utilize the entire set of items
                if (!windowResultMap[field]) {
                    windowResultMap[field] = makeResultFunc(_ => items);
                }
                // invoke add fields to get the desired behaviour using a custom function.
                iterator = (0, addFields_1.$addFields)(iterator, {
                    [field]: {
                        $function: {
                            body: (obj) => windowResultMap[field](obj),
                            args: ["$$CURRENT"]
                        }
                    }
                }, options);
            }
            // add to iterator list
            iterators.push(iterator);
        }));
        return (0, lazy_1.compose)(...iterators);
    }));
};
exports.$setWindowFields = $setWindowFields;
