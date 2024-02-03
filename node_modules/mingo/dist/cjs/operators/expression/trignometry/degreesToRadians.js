"use strict";
// Trignometry Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#trigonometry-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$degreesToRadians = void 0;
const _internal_1 = require("./_internal");
const RADIANS_FACTOR = Math.PI / 180;
/** Converts a value from degrees to radians. */
exports.$degreesToRadians = (0, _internal_1.createTrignometryOperator)((n) => n * RADIANS_FACTOR, {
    Infinity: Infinity,
    "-Infinity": Infinity,
});
