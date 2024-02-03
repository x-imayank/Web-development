import { UpdateOptions } from "../../core";
import { RawObject } from "../../types";
/** Performs a bitwise update of a field. The operator supports AND, OR, and XOR.*/
export declare const $bit: (obj: RawObject, expr: RawObject, arrayFilters?: RawObject[], options?: UpdateOptions) => string[];
