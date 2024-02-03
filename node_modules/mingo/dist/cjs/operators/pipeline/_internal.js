"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUnbounded = void 0;
/** Checks whether the specified window is unbounded. */
const isUnbounded = (window) => {
    const boundary = (window === null || window === void 0 ? void 0 : window.documents) || (window === null || window === void 0 ? void 0 : window.range);
    return (!boundary || (boundary[0] === "unbounded" && boundary[1] === "unbounded"));
};
exports.isUnbounded = isUnbounded;
