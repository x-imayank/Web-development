/** Returns the position of a document in the $setWindowFields stage partition. */
export function $documentNumber(_obj, _collection, expr, _options) {
    return expr.documentNumber;
}
