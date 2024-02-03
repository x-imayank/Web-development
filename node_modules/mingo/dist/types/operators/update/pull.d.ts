import { UpdateOptions } from "../../core";
import { RawObject } from "../../types";
/** Removes from an existing array all instances of a value or values that match a specified condition. */
export declare const $pull: (obj: RawObject, expr: RawObject, arrayFilters?: RawObject[], options?: UpdateOptions) => string[];
