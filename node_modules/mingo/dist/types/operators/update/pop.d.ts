import { UpdateOptions } from "../../core";
import { RawObject } from "../../types";
/** Removes the first or last element of an array. */
export declare const $pop: (obj: RawObject, expr: Record<string, 1 | -1>, arrayFilters?: RawObject[], options?: UpdateOptions) => string[];
