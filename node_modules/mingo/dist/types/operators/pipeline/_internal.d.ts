import { AnyVal, TimeUnit } from "../../types";
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
/** Checks whether the specified window is unbounded. */
export declare const isUnbounded: (window: WindowOutputOption) => boolean;
