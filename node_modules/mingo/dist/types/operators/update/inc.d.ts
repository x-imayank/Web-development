import { UpdateOptions } from "../../core";
import { RawObject } from "../../types";
/** Increments a field by a specified value. */
export declare const $inc: (obj: RawObject, expr: Record<string, number>, arrayFilters?: RawObject[], options?: UpdateOptions) => string[];
