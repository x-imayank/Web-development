import { Options } from "../../../core";
import { AnyVal, Callback } from "../../../types";
/**
 * Allows the use of aggregation expressions within the query language.
 *
 * @param selector
 * @param rhs
 * @returns {Function}
 */
export declare function $expr(_: string, rhs: AnyVal, options: Options): Callback<boolean>;
