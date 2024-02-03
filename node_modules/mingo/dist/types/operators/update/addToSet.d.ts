import { UpdateOptions } from "../../core";
import { RawObject } from "../../types";
/** Adds a value to an array unless the value is already present. */
export declare const $addToSet: (obj: RawObject, expr: RawObject, arrayFilters?: RawObject[], options?: UpdateOptions) => string[];
