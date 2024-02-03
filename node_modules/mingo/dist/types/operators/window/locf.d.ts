import { Options } from "../../core";
import { AnyVal, RawObject, WindowOperatorInput } from "../../types";
/**
 * Last observation carried forward. Sets values for null and missing fields in a window to the last non-null value for the field.
 */
export declare function $locf(_: RawObject, collection: RawObject[], expr: WindowOperatorInput, options: Options): AnyVal;
