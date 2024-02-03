import { Options } from "../../../core";
import { AnyVal, Callback } from "../../../types";
/**
 * Matches documents that satisfy a JavaScript expression.
 *
 * @param selector
 * @param rhs
 * @returns {Function}
 */
export declare function $where(_: string, rhs: AnyVal, options: Options): Callback<boolean>;
