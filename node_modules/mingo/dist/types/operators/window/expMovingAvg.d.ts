import { Options } from "../../core";
import { AnyVal, RawObject, WindowOperatorInput } from "../../types";
/**
 * Returns the exponential moving average of numeric expressions applied to documents
 * in a partition defined in the $setWindowFields stage.
 */
export declare function $expMovingAvg(_: RawObject, collection: RawObject[], expr: WindowOperatorInput, options: Options): AnyVal;
