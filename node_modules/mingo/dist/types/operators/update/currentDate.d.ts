import { UpdateOptions } from "../../core";
import { RawObject } from "../../types";
/** Sets the value of a field to the current date. */
export declare const $currentDate: (obj: RawObject, expr: Record<string, true>, arrayFilters?: RawObject[], options?: UpdateOptions) => string[];
