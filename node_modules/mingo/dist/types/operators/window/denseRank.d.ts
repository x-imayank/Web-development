import { Options } from "../../core";
import { AnyVal, RawObject, WindowOperatorInput } from "../../types";
/** Returns the document position relative to other documents in the $setWindowFields stage partition. */
export declare function $denseRank(obj: RawObject, collection: RawObject[], expr: WindowOperatorInput, options: Options): AnyVal;
