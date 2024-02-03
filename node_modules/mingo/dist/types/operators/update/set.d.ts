import { UpdateOptions } from "../../core";
import { AnyVal, RawObject } from "../../types";
/** Replaces the value of a field with the specified value. */
export declare const $set: (obj: RawObject, expr: Record<string, AnyVal>, arrayFilters?: RawObject[], options?: UpdateOptions) => string[];
