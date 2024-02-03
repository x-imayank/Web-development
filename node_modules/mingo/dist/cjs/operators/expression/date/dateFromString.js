"use strict";
// Date Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#date-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$dateFromString = void 0;
const core_1 = require("../../../core");
const util_1 = require("../../../util");
const _internal_1 = require("./_internal");
const buildMap = (letters, sign) => {
    const h = {};
    letters.split("").forEach((v, i) => (h[v] = sign * (i + 1)));
    return h;
};
const TZ_LETTER_OFFSETS = Object.assign(Object.assign(Object.assign({}, buildMap("ABCDEFGHIKLM", 1)), buildMap("NOPQRSTUVWXY", -1)), { Z: 0 });
/**
 * Converts a date/time string to a date object.
 * @param obj
 * @param expr
 */
const $dateFromString = (obj, expr, options) => {
    const args = (0, core_1.computeValue)(obj, expr, null, options);
    args.format = args.format || _internal_1.DATE_FORMAT;
    args.onNull = args.onNull || null;
    let dateString = args.dateString;
    if ((0, util_1.isNil)(dateString))
        return args.onNull;
    // collect all separators of the format string
    const separators = args.format.split(/%[YGmdHMSLuVzZ]/);
    separators.reverse();
    const matches = args.format.match(/(%%|%Y|%G|%m|%d|%H|%M|%S|%L|%u|%V|%z|%Z)/g);
    const dateParts = {};
    // holds the valid regex of parts that matches input date string
    let expectedPattern = "";
    for (let i = 0, len = matches.length; i < len; i++) {
        const formatSpecifier = matches[i];
        const props = _internal_1.DATE_SYM_TABLE[formatSpecifier];
        if ((0, util_1.isObject)(props)) {
            // get pattern and alias from table
            const m = props.re.exec(dateString);
            // get the next separtor
            const delimiter = separators.pop() || "";
            if (m !== null) {
                // store and cut out matched part
                dateParts[props.name] = /^\d+$/.exec(m[0]) ? parseInt(m[0]) : m[0];
                dateString =
                    dateString.substr(0, m.index) +
                        dateString.substr(m.index + m[0].length);
                // construct expected pattern
                expectedPattern +=
                    (0, _internal_1.regexQuote)(delimiter) + (0, _internal_1.regexStrip)(props.re.toString());
            }
            else {
                dateParts[props.name] = null;
            }
        }
    }
    // 1. validate all required date parts exists
    // 2. validate original dateString against expected pattern.
    if ((0, util_1.isNil)(dateParts.year) ||
        (0, util_1.isNil)(dateParts.month) ||
        (0, util_1.isNil)(dateParts.day) ||
        !new RegExp("^" + expectedPattern + "[A-Z]?$").exec(args.dateString)) {
        return args.onError;
    }
    const m = args.dateString.match(/([A-Z])$/);
    (0, util_1.assert)(
    // only one of in-date timeone or timezone argument but not both.
    !(m && args.timezone), `$dateFromString: you cannot pass in a date/time string with time zone information ('${m && m[0]}') together with a timezone argument`);
    const minuteOffset = m
        ? TZ_LETTER_OFFSETS[m[0]] * _internal_1.MINUTES_PER_HOUR
        : (0, _internal_1.parseTimezone)(args.timezone);
    // create the date. month is 0-based in Date
    const d = new Date(Date.UTC(dateParts.year, dateParts.month - 1, dateParts.day, 0, 0, 0));
    if (!(0, util_1.isNil)(dateParts.hour))
        d.setUTCHours(dateParts.hour);
    if (!(0, util_1.isNil)(dateParts.minute))
        d.setUTCMinutes(dateParts.minute);
    if (!(0, util_1.isNil)(dateParts.second))
        d.setUTCSeconds(dateParts.second);
    if (!(0, util_1.isNil)(dateParts.millisecond))
        d.setUTCMilliseconds(dateParts.millisecond);
    // adjust to the correct represention for UTC
    (0, _internal_1.adjustDate)(d, -minuteOffset);
    return d;
};
exports.$dateFromString = $dateFromString;
