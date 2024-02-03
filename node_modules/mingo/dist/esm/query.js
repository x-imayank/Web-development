import { getOperator, initOptions, OperatorType } from "./core";
import { Cursor } from "./cursor";
import { assert, inArray, isObject, isOperator, normalize } from "./util";
/**
 * An object used to filter input documents
 *
 * @param {Object} condition The condition for constructing predicates
 * @param {Options} options Options for use by operators
 * @constructor
 */
export class Query {
    constructor(condition, options) {
        this.condition = condition;
        this.options = initOptions(options);
        this.compiled = [];
        this.compile();
    }
    compile() {
        assert(isObject(this.condition), `query criteria must be an object: ${JSON.stringify(this.condition)}`);
        const whereOperator = {};
        for (const [field, expr] of Object.entries(this.condition)) {
            if ("$where" === field) {
                Object.assign(whereOperator, { field: field, expr: expr });
            }
            else if (inArray(["$and", "$or", "$nor", "$expr", "$jsonSchema"], field)) {
                this.processOperator(field, field, expr);
            }
            else {
                // normalize expression
                assert(!isOperator(field), `unknown top level operator: ${field}`);
                for (const [operator, val] of Object.entries(normalize(expr))) {
                    this.processOperator(field, operator, val);
                }
            }
            if (whereOperator.field) {
                this.processOperator(whereOperator.field, whereOperator.field, whereOperator.expr);
            }
        }
    }
    processOperator(field, operator, value) {
        const call = getOperator(OperatorType.QUERY, operator, this.options);
        if (!call) {
            throw new Error(`unknown operator ${operator}`);
        }
        const fn = call(field, value, this.options);
        this.compiled.push(fn);
    }
    /**
     * Checks if the object passes the query criteria. Returns true if so, false otherwise.
     *
     * @param obj The object to test
     * @returns {boolean} True or false
     */
    test(obj) {
        for (let i = 0, len = this.compiled.length; i < len; i++) {
            if (!this.compiled[i](obj)) {
                return false;
            }
        }
        return true;
    }
    /**
     * Returns a cursor to select matching documents from the input source.
     *
     * @param source A source providing a sequence of documents
     * @param projection An optional projection criteria
     * @returns {Cursor} A Cursor for iterating over the results
     */
    find(collection, projection) {
        return new Cursor(collection, ((x) => this.test(x)), projection || {}, this.options);
    }
    /**
     * Remove matched documents from the collection returning the remainder
     *
     * @param collection An array of documents
     * @returns {Array} A new array with matching elements removed
     */
    remove(collection) {
        return collection.reduce((acc, obj) => {
            if (!this.test(obj))
                acc.push(obj);
            return acc;
        }, []);
    }
}
