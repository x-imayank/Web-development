import { UpdateOptions } from "../../core";
import { RawArray, RawObject } from "../../types";
/** Removes all instances of the specified values from an existing array. */
export declare const $pullAll: (obj: RawObject, expr: Record<string, RawArray>, arrayFilters?: RawObject[], options?: UpdateOptions) => string[];
