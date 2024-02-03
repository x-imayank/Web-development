import { Options } from "../../core";
import { AnyVal, RawObject, WindowOperatorInput } from "../../types";
/**
 * Returns the value from an expression applied to a document in a specified
 * position relative to the current document in the $setWindowFields stage partition.
 */
export declare function $shift(obj: RawObject, collection: RawObject[], expr: WindowOperatorInput, options: Options): AnyVal;
