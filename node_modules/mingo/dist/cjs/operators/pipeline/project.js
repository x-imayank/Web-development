"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$project = void 0;
const core_1 = require("../../core");
const util_1 = require("../../util");
/**
 * Reshapes a document stream.
 * $project can rename, add, or remove fields as well as create computed values and sub-documents.
 *
 * @param collection
 * @param expr
 * @param opt
 * @returns {Array}
 */
const $project = (collection, expr, options) => {
    if ((0, util_1.isEmpty)(expr))
        return collection;
    // result collection
    let expressionKeys = Object.keys(expr);
    let idOnlyExcluded = false;
    // validate inclusion and exclusion
    validateExpression(expr, options);
    const ID_KEY = options.idKey;
    if ((0, util_1.inArray)(expressionKeys, ID_KEY)) {
        const id = expr[ID_KEY];
        if (id === 0 || id === false) {
            expressionKeys = expressionKeys.filter(util_1.notInArray.bind(null, [ID_KEY]));
            idOnlyExcluded = expressionKeys.length == 0;
        }
    }
    else {
        // if not specified the add the ID field
        expressionKeys.push(ID_KEY);
    }
    const copts = core_1.ComputeOptions.init(options);
    return collection.map(((obj) => processObject(obj, expr, copts.update(obj), expressionKeys, idOnlyExcluded)));
};
exports.$project = $project;
/**
 * Process the expression value for $project operators
 *
 * @param {Object} obj The object to use as options
 * @param {Object} expr The experssion object of $project operator
 * @param {Array} expressionKeys The key in the 'expr' object
 * @param {Boolean} idOnlyExcluded Boolean value indicating whether only the ID key is excluded
 */
function processObject(obj, expr, options, expressionKeys, idOnlyExcluded) {
    let newObj = {};
    let foundSlice = false;
    let foundExclusion = false;
    const dropKeys = [];
    if (idOnlyExcluded) {
        dropKeys.push(options.idKey);
    }
    for (const key of expressionKeys) {
        // final computed value of the key
        let value = undefined;
        // expression to associate with key
        const subExpr = expr[key];
        if (key !== options.idKey && (0, util_1.inArray)([0, false], subExpr)) {
            foundExclusion = true;
        }
        if (key === options.idKey && (0, util_1.isEmpty)(subExpr)) {
            // tiny optimization here to skip over id
            value = obj[key];
        }
        else if ((0, util_1.isString)(subExpr)) {
            value = (0, core_1.computeValue)(obj, subExpr, key, options);
        }
        else if ((0, util_1.inArray)([1, true], subExpr)) {
            // For direct projections, we use the resolved object value
        }
        else if (subExpr instanceof Array) {
            value = subExpr.map(v => {
                const r = (0, core_1.computeValue)(obj, v, null, options);
                if ((0, util_1.isNil)(r))
                    return null;
                return r;
            });
        }
        else if ((0, util_1.isObject)(subExpr)) {
            const subExprObj = subExpr;
            const subExprKeys = Object.keys(subExpr);
            const operator = subExprKeys.length == 1 ? subExprKeys[0] : "";
            // first try a projection operator
            const call = (0, core_1.getOperator)(core_1.OperatorType.PROJECTION, operator, options);
            if (call) {
                // apply the projection operator on the operator expression for the key
                if (operator === "$slice") {
                    // $slice is handled differently for aggregation and projection operations
                    if ((0, util_1.ensureArray)(subExprObj[operator]).every(util_1.isNumber)) {
                        // $slice for projection operation
                        value = call(obj, subExprObj[operator], key, options);
                        foundSlice = true;
                    }
                    else {
                        // $slice for aggregation operation
                        value = (0, core_1.computeValue)(obj, subExprObj, key, options);
                    }
                }
                else {
                    value = call(obj, subExprObj[operator], key, options);
                }
            }
            else if ((0, util_1.isOperator)(operator)) {
                // compute if operator key
                value = (0, core_1.computeValue)(obj, subExprObj[operator], operator, options);
            }
            else if ((0, util_1.has)(obj, key)) {
                // compute the value for the sub expression for the key
                validateExpression(subExprObj, options);
                let target = obj[key];
                if (target instanceof Array) {
                    value = target.map((o) => processObject(o, subExprObj, options, subExprKeys, false));
                }
                else {
                    target = (0, util_1.isObject)(target) ? target : obj;
                    value = processObject(target, subExprObj, options, subExprKeys, false);
                }
            }
            else {
                // compute the value for the sub expression for the key
                value = (0, core_1.computeValue)(obj, subExpr, null, options);
            }
        }
        else {
            dropKeys.push(key);
            continue;
        }
        // get value with object graph
        const objPathGraph = (0, util_1.resolveGraph)(obj, key, {
            preserveMissing: true
        });
        // add the value at the path
        if (objPathGraph !== undefined) {
            (0, util_1.merge)(newObj, objPathGraph, {
                flatten: true
            });
        }
        // if computed add/or remove accordingly
        if ((0, util_1.notInArray)([0, 1, false, true], subExpr)) {
            if (value === undefined) {
                (0, util_1.removeValue)(newObj, key, { descendArray: true });
            }
            else {
                (0, util_1.setValue)(newObj, key, value);
            }
        }
    }
    // filter out all missing values preserved to support correct merging
    (0, util_1.filterMissing)(newObj);
    // For the following cases we include all keys on the object that were not explicitly excluded.
    //
    // 1. projection included $slice operator
    // 2. some fields were explicitly excluded
    // 3. only the id field was excluded
    if (foundSlice || foundExclusion || idOnlyExcluded) {
        newObj = (0, util_1.into)({}, obj, newObj);
        if (dropKeys.length > 0) {
            for (const k of dropKeys) {
                (0, util_1.removeValue)(newObj, k, { descendArray: true });
            }
        }
    }
    return newObj;
}
/**
 * Validate inclusion and exclusion values in expression
 *
 * @param {Object} expr The expression given for the projection
 */
function validateExpression(expr, options) {
    const check = [false, false];
    for (const [k, v] of Object.entries(expr)) {
        if (k === (options === null || options === void 0 ? void 0 : options.idKey))
            return;
        if (v === 0 || v === false) {
            check[0] = true;
        }
        else if (v === 1 || v === true) {
            check[1] = true;
        }
        (0, util_1.assert)(!(check[0] && check[1]), "Projection cannot have a mix of inclusion and exclusion.");
    }
}
