import { Options } from "../../core";
import { AnyVal, RawObject, WindowOperatorInput } from "../../types";
/**
 * Returns the average rate of change within the specified window
 */
export declare function $derivative(_: RawObject, collection: RawObject[], expr: WindowOperatorInput, options: Options): AnyVal;
