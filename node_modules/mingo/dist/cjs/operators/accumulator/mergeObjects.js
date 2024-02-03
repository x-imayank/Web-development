"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$mergeObjects = void 0;
const mergeObjects_1 = require("../expression/object/mergeObjects");
/**
 * Combines multiple documents into a single document.
 *
 * @param {Array} collection The input array
 * @param {Object} _ The right-hand side expression value of the operator
 * @param {Options} options The options to use for this operation
 * @returns {Array|*}
 */
const $mergeObjects = (collection, _, options) => (0, mergeObjects_1.$mergeObjects)({ docs: collection }, "$docs", options);
exports.$mergeObjects = $mergeObjects;
