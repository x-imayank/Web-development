export type AnyVal = unknown;
export type RawObject = Record<string, AnyVal>;
export type RawArray = Array<AnyVal>;
export type ArrayOrObject = RawObject | RawArray;
export interface Callback<R = AnyVal, T = AnyVal> {
    (...args: T[]): R;
}
export interface Predicate<T = AnyVal> {
    (...args: T[]): boolean;
}
export interface Comparator<T = AnyVal> {
    (left: T, right: T): number;
}
export type GroupByOutput = Map<AnyVal, Array<AnyVal>>;
/**
 * Custom function to hash values to improve faster comparaisons
 */
export type HashFunction = Callback<number>;
type CommonTypes = "null" | "undefined" | "string" | "date" | "array" | "object";
export type JsType = CommonTypes | "boolean" | "number" | "string" | "regexp" | "function";
export type BsonType = CommonTypes | "bool" | "int" | "long" | "double" | "decimal" | "regex";
/** Time unit for datetime periods */
export type TimeUnit = "year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second" | "millisecond";
/** @deprecated. Use TimeUnit */
export type Duration = TimeUnit;
export type Boundary = "current" | "unbounded" | number;
export interface WindowOutputOption {
    readonly documents?: [Boundary, Boundary];
    readonly range?: [Boundary, Boundary];
    readonly unit?: TimeUnit;
}
export interface SetWindowFieldsInput {
    readonly partitionBy?: AnyVal;
    readonly sortBy: Record<string, 1 | -1>;
    readonly output: Record<string, {
        [x: string]: AnyVal;
        window?: WindowOutputOption;
    }>;
}
export interface WindowOperatorInput {
    readonly parentExpr: SetWindowFieldsInput;
    readonly inputExpr: AnyVal;
    readonly documentNumber: number;
    readonly field: string;
}
export {};
