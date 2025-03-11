/**
 * Converts Persian numerals in a string to their English equivalents.
 * Handles null/undefined, numbers, and non-string inputs gracefully.
 * @param {string|number|null|undefined} input - The input to convert.
 * @returns {string} - The converted string with English numerals.
 */
function convertPersianToEnglishNumbers(input) {
    // Handle null/undefined and convert numbers to strings
    if (input === null || input === undefined) return '';
    const processedInput = typeof input === 'number' ? input.toString() : String(input);

    // Define numeral maps as constants
    const PERSIAN_TO_ENGLISH_MAP = {
        '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4',
        '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9'
    };

    // Use single regex replacement with callback function
    return processedInput.replace(
        /[۰۱۲۳۴۵۶۷۸۹]/g,
        (match) => PERSIAN_TO_ENGLISH_MAP[match]
    );
}

export default convertPersianToEnglishNumbers;