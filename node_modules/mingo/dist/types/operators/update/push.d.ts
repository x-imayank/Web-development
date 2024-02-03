import { UpdateOptions } from "../../core";
import { RawObject } from "../../types";
/** Appends a specified value to an array. */
export declare const $push: (obj: RawObject, expr: RawObject, arrayFilters?: RawObject[], options?: UpdateOptions) => string[];
