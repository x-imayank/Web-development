import { UpdateOptions } from "../../core";
import { RawObject } from "../../types";
/** Multiply the value of a field by a number. */
export declare const $mul: (obj: RawObject, expr: Record<string, number>, arrayFilters?: RawObject[], options?: UpdateOptions) => string[];
