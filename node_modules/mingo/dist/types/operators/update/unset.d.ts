import { UpdateOptions } from "../../core";
import { RawObject } from "../../types";
/** Deletes a particular field */
export declare const $unset: (obj: RawObject, expr: Record<string, "">, arrayFilters?: RawObject[], options?: UpdateOptions) => string[];
