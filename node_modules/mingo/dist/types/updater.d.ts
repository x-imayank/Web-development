import { UpdateOptions } from "./core";
import * as UPDATE_OPERATORS from "./operators/update";
import { RawObject } from "./types";
/** Define maps to enforce a single key from a union. */
type OneKey<K extends keyof any, V, KK extends keyof any = K> = {
    [P in K]: {
        [Q in P]: V;
    } & {
        [Q in Exclude<KK, P>]?: never;
    } extends infer O ? {
        [Q in keyof O]: O[Q];
    } : never;
}[K];
export type UpdateExpression = OneKey<keyof typeof UPDATE_OPERATORS, RawObject>;
/** Interface for update operators */
export type UpdateOperator = (obj: RawObject, expr: RawObject, arrayFilters: RawObject[], options?: UpdateOptions) => string[];
/** A function to process an update expression and modify the object. */
export type Updater = (obj: RawObject, expr: UpdateExpression, arrayFilters?: RawObject[], condition?: RawObject, options?: UpdateOptions) => Array<string>;
/**
 * Creates a new updater function with default options.
 * @param defaultOptions The default options. Defaults to no cloning with strict mode off for queries.
 * @returns {Updater}
 */
export declare function createUpdater(defaultOptions: UpdateOptions): Updater;
/**
 * Updates the given object with the expression.
 *
 * @param obj The object to update.
 * @param expr The update expressions.
 * @param arrayFilters Filters to apply to nested items.
 * @param conditions Conditions to validate before performing update.
 * @param options Update options to override defaults.
 * @returns {Array<string>} A list of modified field paths in the object.
 */
export declare const updateObject: Updater;
export {};
