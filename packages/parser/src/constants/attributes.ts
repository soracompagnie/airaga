/**
 * @constant {RegExp} attributeRegex
 * @returns {RegExp}
 * Regex to match HTML-like attributes in the format:
 * key="value", key='value', or standalone key
 * Examples:
 * - class="my-class"
 * - disabled
 * - data-value='123'
 * - selected
 *
 */
export const attributeRegex: RegExp = /([a-zA-Z0-9-]+)="([^"]*)"|([a-zA-Z0-9-]+)='([^']*)'|([a-zA-Z0-9-]+)/g;