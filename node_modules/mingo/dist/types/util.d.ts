/**
 * Utility constants and functions
 */
import { AnyVal, ArrayOrObject, Callback, Comparator, GroupByOutput, HashFunction, RawArray, RawObject } from "./types";
export declare const MAX_INT = 2147483647;
export declare const MIN_INT = -2147483648;
export declare const MAX_LONG: number;
export declare const MIN_LONG: number;
/** Options to resolve() and resolveGraph() functions */
interface ResolveOptions {
    unwrapArray?: boolean;
    preserveMissing?: boolean;
    preserveKeys?: boolean;
}
/**
 * Compare function which adheres to MongoDB comparison order.
 *
 * @param a The first value
 * @param b The second value
 * @returns {Number}
 */
export declare const compare: (a: AnyVal, b: AnyVal) => number;
export declare function assert(condition: boolean, message: string): void;
/**
 * Deep clone an object. Value types and immutable objects are returned as is.
 */
export declare const cloneDeep: (obj: AnyVal) => AnyVal;
/**
 * Returns the name of type as specified in the tag returned by a call to Object.prototype.toString
 * @param v A value
 */
export declare const getType: (v: AnyVal) => string;
export declare const isBoolean: (v: AnyVal) => v is boolean;
export declare const isString: (v: AnyVal) => v is string;
export declare const isSymbol: (v: AnyVal) => boolean;
export declare const isNumber: (v: AnyVal) => v is number;
export declare const isBigInt: (v: AnyVal) => v is bigint;
export declare const isNotNaN: (v: AnyVal) => boolean;
export declare const isArray: (arg: any) => arg is any[];
export declare const isObject: (v: AnyVal) => v is object;
export declare const isObjectLike: (v: AnyVal) => boolean;
export declare const isDate: (v: AnyVal) => v is Date;
export declare const isRegExp: (v: AnyVal) => v is RegExp;
export declare const isFunction: (v: AnyVal) => boolean;
export declare const isNil: (v: AnyVal) => boolean;
export declare const inArray: (arr: AnyVal[], item: AnyVal) => boolean;
export declare const notInArray: (arr: RawArray, item: AnyVal) => boolean;
export declare const truthy: (arg: AnyVal, strict?: boolean) => boolean;
export declare const isEmpty: (x: AnyVal) => boolean;
export declare const isMissing: (v: AnyVal) => boolean;
/** ensure a value is an array or wrapped within one. */
export declare const ensureArray: (x: AnyVal) => RawArray;
export declare const has: (obj: RawObject, prop: string) => boolean;
/** Options to merge function */
interface MergeOptions {
    flatten?: boolean;
    skipValidation?: boolean;
}
/**
 * Deep merge objects or arrays.
 * When the inputs have unmergeable types, the  right hand value is returned.
 * If inputs are arrays and options.flatten is set, elements in the same position are merged together. Remaining elements are appended to the target object.
 * If options.flatten is false, the right hand value is just appended to the left-hand value.
 * @param target {Object|Array} the target to merge into
 * @param obj {Object|Array} the source object
 */
export declare function merge(target: AnyVal, obj: AnyVal, options?: MergeOptions): AnyVal;
/**
 * Returns the intersection of multiple arrays.
 *
 * @param  {Array} input An array of arrays from which to find intersection.
 * @param  {Function} hashFunction Custom function to hash values, default the hashCode method
 * @return {Array} Array of intersecting values.
 */
export declare function intersection(input: RawArray[], hashFunction?: HashFunction): RawArray;
/**
 * Flatten the array
 *
 * @param {Array} xs The array to flatten
 * @param {Number} depth The number of nested lists to iterate
 */
export declare function flatten(xs: RawArray, depth?: number): RawArray;
/**
 * Determine whether two values are the same or strictly equivalent.
 * Checking whether values are the same only applies to built in objects.
 * For user-defined objects this checks for only referential equality so
 * two different instances with the same values are not equal.
 *
 * @param  {*}  a The first value
 * @param  {*}  b The second value
 * @return {Boolean}   Result of comparison
 */
export declare function isEqual(a: AnyVal, b: AnyVal): boolean;
/**
 * Return a new unique version of the collection
 * @param  {Array} input The input collection
 * @return {Array}
 */
export declare function unique(input: RawArray, hashFunction?: HashFunction): RawArray;
/**
 * Encode value to string using a simple non-colliding stable scheme.
 * Handles user-defined types by processing keys on first non-empty prototype.
 * If a user-defined type provides a "toJSON" function, it is used.
 *
 * @param value The value to convert to a string representation.
 * @returns {String}
 */
export declare function stringify(value: AnyVal): string;
/**
 * Generate hash code
 * This selected function is the result of benchmarking various hash functions.
 * This version performs well and can hash 10^6 documents in ~3s with on average 100 collisions.
 *
 * @param value
 * @returns {number|null}
 */
export declare function hashCode(value: AnyVal, hashFunction?: HashFunction): string | null;
/**
 * Returns a (stably) sorted copy of list, ranked in ascending order by the results of running each value through iteratee
 *
 * This implementation treats null/undefined sort keys as less than every other type
 *
 * @param {Array}   collection
 * @param {Function} keyFn The sort key function used to resolve sort keys
 * @param {Function} comparator The comparator function to use for comparing keys. Defaults to standard comparison via `compare(...)`
 * @return {Array} Returns a new sorted array by the given key and comparator function
 */
export declare function sortBy<T = AnyVal>(collection: RawArray, keyFn: Callback<T>, comparator?: Comparator<T>): RawArray;
/**
 * Groups the collection into sets by the returned key
 *
 * @param collection
 * @param keyFn {Function} to compute the group key of an item in the collection
 * @returns {GroupByOutput}
 */
export declare function groupBy(collection: RawArray, keyFn: Callback<AnyVal>, hashFunction?: HashFunction): GroupByOutput;
/**
 * Merge elements into the dest
 *
 * @param {*} target The target object
 * @param {*} rest The array of elements to merge into dest
 */
export declare function into(target: ArrayOrObject, ...rest: Array<ArrayOrObject>): ArrayOrObject;
/**
 * This is a generic memoization function
 *
 * This implementation uses a cache independent of the function being memoized
 * to allow old values to be garbage collected when the memoized function goes out of scope.
 *
 * @param {*} fn The function object to memoize
 */
export declare function memoize(fn: Callback<AnyVal>, hashFunction?: HashFunction): Callback<AnyVal>;
/**
 * Resolve the value of the field (dot separated) on the given object
 * @param obj {Object} the object context
 * @param selector {String} dot separated path to field
 * @returns {*}
 */
export declare function resolve(obj: ArrayOrObject, selector: string, options?: ResolveOptions): AnyVal;
/**
 * Returns the full object to the resolved value given by the selector.
 * This function excludes empty values as they aren't practically useful.
 *
 * @param obj {Object} the object context
 * @param selector {String} dot separated path to field
 */
export declare function resolveGraph(obj: ArrayOrObject, selector: string, options?: ResolveOptions): ArrayOrObject | undefined;
/**
 * Filter out all MISSING values from the object in-place
 *
 * @param obj The object to filter
 */
export declare function filterMissing(obj: ArrayOrObject): void;
/** Options passed to the walk function. */
export interface WalkOptions {
    buildGraph?: boolean;
    descendArray?: boolean;
}
/**
 * Walk the object graph and execute the given transform function
 *
 * @param  {Object|Array} obj   The object to traverse.
 * @param  {String} selector    The selector to navigate.
 * @param  {Callback} fn Callback to execute for value at the end the traversal.
 * @param  {WalkOptions} options The opetions to use for the function.
 * @return {*}
 */
export declare function walk(obj: ArrayOrObject, selector: string, fn: Callback<void>, options?: WalkOptions): void;
/**
 * Set the value of the given object field
 *
 * @param obj {Object|Array} the object context
 * @param selector {String} path to field
 * @param value {*} the value to set. if it is function, it is invoked with the old value and must return the new value.
 */
export declare function setValue(obj: ArrayOrObject, selector: string, value: AnyVal): void;
/**
 * Removes an element from the container.
 * If the selector resolves to an array and the leaf is a non-numeric key,
 * the remove operation will be performed on objects of the array.
 *
 * @param obj {ArrayOrObject} object or array
 * @param selector {String} dot separated path to element to remove
 */
export declare function removeValue(obj: ArrayOrObject, selector: string, options?: Pick<WalkOptions, "descendArray">): void;
/**
 * Check whether the given name passes for an operator. We assume AnyVal field name starting with '$' is an operator.
 * This is cheap and safe to do since keys beginning with '$' should be reserved for internal use.
 * @param {String} name
 */
export declare function isOperator(name: string): boolean;
/**
 * Simplify expression for easy evaluation with query operators map
 * @param expr
 * @returns {*}
 */
export declare function normalize(expr: AnyVal): AnyVal;
/**
 * Find the insert index for the given key in a sorted array.
 *
 * @param {*} sorted The sorted array to search
 * @param {*} item The search key
 */
export declare function findInsertIndex(sorted: RawArray, item: AnyVal): number;
export {};
