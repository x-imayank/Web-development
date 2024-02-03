import { Options } from "../../core";
import { AnyVal, Callback, RawObject, WindowOperatorInput } from "../../types";
export type TimeUnit = "week" | "day" | "hour" | "minute" | "second" | "millisecond";
export declare const MILLIS_PER_UNIT: Record<TimeUnit, number>;
/**
 * Caches all computed values in a window sequence for reuse.
 * This is only useful for operations with unbounded documents.
 */
export declare function withMemo<T = AnyVal, R = AnyVal>(collection: RawObject[], expr: WindowOperatorInput, cacheFn: Callback<T>, fn: Callback<R, T>): R;
/** Returns the position of a document in the $setWindowFields stage partition. */
export declare function rank(_: RawObject, collection: RawObject[], expr: WindowOperatorInput, options: Options, dense: boolean): AnyVal;
