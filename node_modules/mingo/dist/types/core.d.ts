import { Iterator } from "./lazy";
import { AnyVal, Callback, HashFunction, Predicate, RawArray, RawObject, WindowOperatorInput } from "./types";
/**
 * Resolves the given string to a Collection.
 * This is useful for operators that require a second collection to use such as $lookup and $out.
 * The collection is not cached and will be resolved each time it is used.
 */
export type CollectionResolver = (name: string) => Array<RawObject>;
/** Specification for collation options */
export interface CollationSpec {
    readonly locale: string;
    readonly caseLevel?: boolean;
    readonly caseFirst?: "upper" | "lower" | "off";
    readonly strength?: 1 | 2 | 3;
    readonly numericOrdering?: boolean;
    readonly alternate?: string;
    readonly maxVariable?: never;
    readonly backwards?: never;
}
/**
 * JSON schema validator
 */
export type JsonSchemaValidator = (schema: RawObject) => Predicate<RawObject>;
/**
 * This controls how input and output documents are processed to meet different application needs.
 * Each mode has different trade offs for; immutability, reference sharing, and performance.
 */
export declare enum ProcessingMode {
    /**
     * Clone inputs prior to processing, and the outputs if some objects graphs may be shared.
     * Use this option to keep input collection immutable and to get distinct output objects.
     *
     * Note: This option is expensive and reduces performance.
     */
    CLONE_ALL = "CLONE_ALL",
    /**
     * Clones inputs prior to processing.
     * This option will return output objects with shared graphs in their path if specific operators are used.
     * Use this option to keep the input collection immutable.
     *
     */
    CLONE_INPUT = "CLONE_INPUT",
    /**
     * Clones the output to return distinct objects with no shared paths.
     * This option modifies the input collection and during processing.
     */
    CLONE_OUTPUT = "CLONE_OUTPUT",
    /**
     * Turn off cloning and modifies the input collection as needed.
     * This option will also return output objects with shared paths in their graph when specific operators are used.
     * This option provides the greatest speedup for the biggest tradeoff.
     * When using the aggregation pipeline, you can use the "$out" operator to collect immutable intermediate results.
     *
     * @default
     */
    CLONE_OFF = "CLONE_OFF"
}
/**
 * Generic options interface passed down to all operators
 */
export interface Options {
    /** The key that is used to lookup the ID value of a document. @default "_id". */
    readonly idKey: string;
    /** The collation specification for string sorting operations. */
    readonly collation?: CollationSpec;
    /** Determines how to treat inputs and outputs. @default ProcessingMode.CLONE_OFF. */
    readonly processingMode: ProcessingMode;
    /** Enforces strict MongoDB compatibilty. See README. @default true. */
    readonly useStrictMode: boolean;
    /** Enable or disable custom script execution via $where, $accumulator, and $function operators. @default true. */
    readonly scriptEnabled: boolean;
    /** Enable or disable falling back to the global context for operators. @default true. */
    readonly useGlobalContext: boolean;
    /** Hash function to replace the Effective Java default implementation. */
    readonly hashFunction?: HashFunction;
    /** Function to resolve strings to arrays for use with operators that reference other collections such as; `$lookup`, `$out` and `$merge`. */
    readonly collectionResolver?: CollectionResolver;
    /** JSON schema validator to use with the '$jsonSchema' operator. Required in order to use the operator. */
    readonly jsonSchemaValidator?: JsonSchemaValidator;
    /** Global variables. */
    readonly variables?: Readonly<RawObject>;
    /** Extra references to operators to be used for processing. */
    readonly context: Context;
}
interface LocalData {
    /** The groupId computed for a group of documents. */
    readonly groupId?: AnyVal;
    /** Local user-defind variables. */
    readonly variables?: RawObject;
}
/** Custom type to facilitate type checking for global options */
export declare class ComputeOptions implements Options {
    private _opts;
    /** Reference to the root object when processing subgraphs of the object. */
    private _root;
    private _local?;
    /** The current time in milliseconds. Remains the same throughout all stages of the aggregation pipeline. */
    readonly timestamp: number;
    private constructor();
    /**
     * Initialize new ComputeOptions.
     *
     * @param options
     * @param root
     * @param local
     * @returns {ComputeOptions}
     */
    static init(options: Options, root?: AnyVal, local?: LocalData): ComputeOptions;
    /** Updates the internal mutable state. */
    update(root?: AnyVal, local?: LocalData): ComputeOptions;
    getOptions(): Options;
    get root(): unknown;
    get local(): LocalData;
    get idKey(): string;
    get collation(): CollationSpec;
    get processingMode(): ProcessingMode;
    get useStrictMode(): boolean;
    get scriptEnabled(): boolean;
    get useGlobalContext(): boolean;
    get hashFunction(): HashFunction;
    get collectionResolver(): CollectionResolver;
    get jsonSchemaValidator(): JsonSchemaValidator;
    get variables(): Readonly<RawObject>;
    get context(): Context;
}
/**
 * Creates an Option from another where required keys are initialized.
 * @param options Options
 */
export declare function initOptions(options: Partial<Options>): Options;
/**
 * Supported cloning modes.
 * - "deep": Performs a recursive deep clone of the object.
 * - "copy": Performs a shallow copy of the object.
 * - "none": No cloning. Uses the value as given.
 */
export type CloneMode = "deep" | "copy" | "none";
export interface UpdateOptions {
    /** Specifies whether to deep clone values to persist in the internal store. @default "copy". */
    readonly cloneMode?: CloneMode;
    /** Options to use for processing queries. Unless overriden 'useStrictMode' is false.  */
    readonly queryOptions?: Partial<Options>;
}
/**
 * The different groups of operators
 */
export declare enum OperatorType {
    ACCUMULATOR = "accumulator",
    EXPRESSION = "expression",
    PIPELINE = "pipeline",
    PROJECTION = "projection",
    QUERY = "query",
    WINDOW = "window"
}
export type AccumulatorOperator<R = AnyVal> = (collection: RawArray, expr: AnyVal, options: Options) => R;
export type ExpressionOperator<R = AnyVal> = (obj: RawObject, expr: AnyVal, options: Options) => R;
export type PipelineOperator = (collection: Iterator, expr: AnyVal, options: Options) => Iterator;
export type ProjectionOperator = (obj: RawObject, expr: AnyVal, selector: string, options: Options) => AnyVal;
export type QueryOperator = (selector: string, value: AnyVal, options: Options) => (obj: RawObject) => boolean;
export type WindowOperator = (obj: RawObject, array: RawObject[], expr: WindowOperatorInput, options: Options) => AnyVal;
/** Interface for update operators */
export type UpdateOperator = (obj: RawObject, expr: RawObject, arrayFilters: RawObject[], options: UpdateOptions) => string[];
export type Operator = AccumulatorOperator | ExpressionOperator | PipelineOperator | ProjectionOperator | QueryOperator | WindowOperator;
/** Map of operator functions */
export type OperatorMap = Record<string, Operator>;
type ContextMap = Partial<{
    [OperatorType.ACCUMULATOR]: Record<string, AccumulatorOperator>;
    [OperatorType.EXPRESSION]: Record<string, ExpressionOperator>;
    [OperatorType.PIPELINE]: Record<string, PipelineOperator>;
    [OperatorType.PROJECTION]: Record<string, ProjectionOperator>;
    [OperatorType.QUERY]: Record<string, QueryOperator>;
    [OperatorType.WINDOW]: Record<string, WindowOperator>;
}>;
type AccumulatorOps = Record<string, AccumulatorOperator>;
type ExpressionOps = Record<string, ExpressionOperator>;
type ProjectionOps = Record<string, ProjectionOperator>;
type QueryOps = Record<string, QueryOperator>;
type PipelineOps = Record<string, PipelineOperator>;
type WindowOps = Record<string, WindowOperator>;
export declare class Context {
    private readonly operators;
    private constructor();
    static init(ops?: ContextMap): Context;
    static from(ctx: Context): Context;
    private addOperators;
    addAccumulatorOps(ops: AccumulatorOps): Context;
    addExpressionOps(ops: ExpressionOps): Context;
    addQueryOps(ops: QueryOps): Context;
    addPipelineOps(ops: PipelineOps): Context;
    addProjectionOps(ops: ProjectionOps): Context;
    addWindowOps(ops: WindowOps): Context;
    getOperator(type: OperatorType, name: string): Callback | null;
}
/**
 * Register fully specified operators for the given operator class.
 *
 * @param type The operator type
 * @param operators Map of the operators
 */
export declare function useOperators(type: OperatorType, operators: OperatorMap): void;
/**
 * Overrides the current global context with this new one.
 *
 * @param context The new context to override the global one with.
 */
/**
 * Returns the operator function or undefined if it is not found
 * @param type Type of operator
 * @param operator Name of the operator
 */
export declare function getOperator(type: OperatorType, operator: string, options: Pick<Options, "useGlobalContext" | "context">): Operator;
/**
 * Computes the value of the expression on the object for the given operator
 *
 * @param obj the current object from the collection
 * @param expr the expression for the given field
 * @param operator the operator to resolve the field with
 * @param options {Object} extra options
 * @returns {*}
 */
export declare function computeValue(obj: AnyVal, expr: AnyVal, operator: string | null, options?: Options): AnyVal;
/**
 * Redact an object
 * @param  {Object} obj The object to redact
 * @param  {*} expr The redact expression
 * @param  {*} options  Options for value
 * @return {*} returns the result of the redacted object
 */
export declare function redact(obj: RawObject, expr: AnyVal, options: ComputeOptions): AnyVal;
export {};
