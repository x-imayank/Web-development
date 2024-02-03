"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BASIC_CONTEXT = void 0;
/**
 * Loads all Query and Projection operators
 */
const core_1 = require("../core");
const booleanOperators = __importStar(require("../operators/expression/boolean"));
const comparisonOperators = __importStar(require("../operators/expression/comparison"));
const pipeline_1 = require("../operators/pipeline");
const projectionOperators = __importStar(require("../operators/projection"));
const queryOperators = __importStar(require("../operators/query"));
(0, core_1.useOperators)(core_1.OperatorType.EXPRESSION, Object.assign(Object.assign({}, booleanOperators), comparisonOperators));
(0, core_1.useOperators)(core_1.OperatorType.PIPELINE, {
    $project: pipeline_1.$project,
    $skip: pipeline_1.$skip,
    $limit: pipeline_1.$limit,
    $sort: pipeline_1.$sort
});
(0, core_1.useOperators)(core_1.OperatorType.PROJECTION, projectionOperators);
(0, core_1.useOperators)(core_1.OperatorType.QUERY, queryOperators);
/** The basic context for queries. */
exports.BASIC_CONTEXT = core_1.Context.init()
    .addExpressionOps(Object.assign(Object.assign({}, booleanOperators), comparisonOperators))
    .addPipelineOps({ $project: pipeline_1.$project, $skip: pipeline_1.$skip, $limit: pipeline_1.$limit, $sort: pipeline_1.$sort })
    .addProjectionOps(projectionOperators)
    .addQueryOps(queryOperators);
