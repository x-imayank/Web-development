/**
 * Loads all Query and Projection operators
 */
import { Context, OperatorType, useOperators } from "../core";
import * as booleanOperators from "../operators/expression/boolean";
import * as comparisonOperators from "../operators/expression/comparison";
import { $limit, $project, $skip, $sort } from "../operators/pipeline";
import * as projectionOperators from "../operators/projection";
import * as queryOperators from "../operators/query";
useOperators(OperatorType.EXPRESSION, Object.assign(Object.assign({}, booleanOperators), comparisonOperators));
useOperators(OperatorType.PIPELINE, {
    $project,
    $skip,
    $limit,
    $sort
});
useOperators(OperatorType.PROJECTION, projectionOperators);
useOperators(OperatorType.QUERY, queryOperators);
/** The basic context for queries. */
export const BASIC_CONTEXT = Context.init()
    .addExpressionOps(Object.assign(Object.assign({}, booleanOperators), comparisonOperators))
    .addPipelineOps({ $project, $skip, $limit, $sort })
    .addProjectionOps(projectionOperators)
    .addQueryOps(queryOperators);
