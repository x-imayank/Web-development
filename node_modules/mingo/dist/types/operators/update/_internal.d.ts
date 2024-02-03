import { CloneMode, UpdateOptions } from "../../core";
import { Query } from "../../query";
import { AnyVal, ArrayOrObject, Callback, RawObject } from "../../types";
import { WalkOptions } from "../../util";
export declare const clone: (mode: CloneMode, val: AnyVal) => AnyVal;
export type PathNode = {
    selector: string;
    parent: string;
    child?: string;
    next?: PathNode;
};
/**
 * Tokenize a selector path to extract parts for the root, arrayFilter, and child
 * @param selector The path to tokenize
 * @returns {parent:string, elem:string, child:string}
 */
export declare function tokenizePath(selector: string): [PathNode, string[]];
/**
 * Applies an update function to a value to produce a new value to modify an object in-place.
 * @param o The object or array to modify.
 * @param n The path node of the update selector.
 * @param q Map of positional identifiers to queries for filtering.
 * @param f The update function which accepts containver value and key.
 * @param opts The optional {@link WalkOptions} passed to the walk function.
 */
export declare const applyUpdate: (o: ArrayOrObject, n: PathNode, q: Record<string, Query>, f: Callback<boolean>, opts?: WalkOptions) => boolean;
export type Action<T = AnyVal> = (val: T, pathNode: PathNode, queries: Record<string, Query>) => boolean;
/**
 * Walks the expression and apply the given action for each key-value pair.
 *
 * @param expr The expression for the update operator.
 * @param arrayFilter Filter conditions passed to the operator.
 * @param options The options provided by the caller.
 * @param callback The action to apply for a given path and value.
 * @returns {Array<string>}
 */
export declare function walkExpression<T>(expr: RawObject, arrayFilter: RawObject[], options: UpdateOptions, callback: Action<T>): string[];
