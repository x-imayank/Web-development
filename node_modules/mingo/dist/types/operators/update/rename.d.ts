import { UpdateOptions } from "../../core";
import { RawObject } from "../../types";
/** Replaces the value of a field with the specified value. */
export declare const $rename: (obj: RawObject, expr: Record<string, string>, arrayFilters?: RawObject[], options?: UpdateOptions) => string[];
