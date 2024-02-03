import { Options } from "../../core";
import { AnyVal, RawObject, WindowOperatorInput } from "../../types";
/**
 * Fills null and missing fields in a window using linear interpolation based on surrounding field values.
 */
export declare function $linearFill(_: RawObject, collection: RawObject[], expr: WindowOperatorInput, options: Options): AnyVal;
