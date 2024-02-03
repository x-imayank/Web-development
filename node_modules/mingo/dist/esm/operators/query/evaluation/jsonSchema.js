// Query Evaluation Operators: https://docs.mongodb.com/manual/reference/operator/query-evaluation/
/**
 * Validate documents against the given JSON Schema.
 *
 * @param selector
 * @param schema
 * @returns {Function}
 */
export function $jsonSchema(_, schema, options) {
    if (!(options === null || options === void 0 ? void 0 : options.jsonSchemaValidator)) {
        throw new Error("Missing option 'jsonSchemaValidator'. Configure to use '$jsonSchema' operator.");
    }
    const validate = options === null || options === void 0 ? void 0 : options.jsonSchemaValidator(schema);
    return (obj) => validate(obj);
}
