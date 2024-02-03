import { Options } from "../../../core";
import { AnyVal, RawObject } from "../../../types";
/**
 * Returns a random float between 0 and 1.
 *
 * @param {*} _obj The target object for this expression
 * @param {*} _expr The right-hand side of the operator
 * @param {Options} _options Options to use for operation
 */
export declare const $rand: (_obj: RawObject, _expr: AnyVal, _options: Options) => number;
