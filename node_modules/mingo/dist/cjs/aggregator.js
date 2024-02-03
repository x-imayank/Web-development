"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aggregator = void 0;
const core_1 = require("./core");
const lazy_1 = require("./lazy");
const util_1 = require("./util");
/**
 * Provides functionality for the mongoDB aggregation pipeline
 *
 * @param pipeline an Array of pipeline operators
 * @param options An optional Options to pass the aggregator
 * @constructor
 */
class Aggregator {
    constructor(pipeline, options) {
        this.pipeline = pipeline;
        this.options = (0, core_1.initOptions)(options);
    }
    /**
     * Returns an `Lazy` iterator for processing results of pipeline
     *
     * @param {*} collection An array or iterator object
     * @returns {Iterator} an iterator object
     */
    stream(collection) {
        let iterator = (0, lazy_1.Lazy)(collection);
        const mode = this.options.processingMode;
        if (mode == core_1.ProcessingMode.CLONE_ALL ||
            mode == core_1.ProcessingMode.CLONE_INPUT) {
            iterator.map(util_1.cloneDeep);
        }
        const pipelineOperators = new Array();
        if (!(0, util_1.isEmpty)(this.pipeline)) {
            // run aggregation pipeline
            for (const operator of this.pipeline) {
                const operatorKeys = Object.keys(operator);
                const opName = operatorKeys[0];
                const call = (0, core_1.getOperator)(core_1.OperatorType.PIPELINE, opName, this.options);
                (0, util_1.assert)(operatorKeys.length === 1 && !!call, `invalid pipeline operator ${opName}`);
                pipelineOperators.push(opName);
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                iterator = call(iterator, operator[opName], this.options);
            }
        }
        // operators that may share object graphs of inputs.
        // we only need to clone the output for these since the objects will already be distinct for other operators.
        if (mode == core_1.ProcessingMode.CLONE_OUTPUT ||
            (mode == core_1.ProcessingMode.CLONE_ALL &&
                !!(0, util_1.intersection)([["$group", "$unwind"], pipelineOperators]).length)) {
            iterator.map(util_1.cloneDeep);
        }
        return iterator;
    }
    /**
     * Return the results of the aggregation as an array.
     *
     * @param {*} collection
     * @param {*} query
     */
    run(collection) {
        return this.stream(collection).value();
    }
}
exports.Aggregator = Aggregator;
