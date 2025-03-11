/**
 * Converts a number string to Persian words.
 * @param {string} numStr - The number as a string.
 * @param {object} dataUnit - An object containing Persian words for numbers, ranks, and units.
 * @returns {string} - The number expressed in Persian words.
 */
function numberToPersianWords(numStr, dataUnit) {
    // Validate input
    if (typeof numStr !== 'string') {
        return 'لطفاً یک عدد معتبر وارد کنید.';
    }

    // Handle negative numbers
    if (numStr.startsWith('-')) {
        return `منفی ${numberToPersianWords(numStr.slice(1), dataUnit)}`;
    }

    // Handle decimal numbers
    if (numStr.includes('.')) {
        const [integerPart, decimalPart] = numStr.split('.');
        const integerWords = numberToPersianWords(integerPart, dataUnit);
        const decimalWords = numberToPersianWords(decimalPart, dataUnit);

        // Determine the unit based on the number of decimal digits
        const decimalUnit = dataUnit.decimalUnits[decimalPart.length - 1] || "ممیز";

        return `${integerWords} ممیز ${decimalWords} ${decimalUnit}`;
    }

    // Check if dataUnit is loaded
    if (!dataUnit) {
        return 'داده‌ها هنوز بارگیری نشده‌اند.';
    }

    // Handle zero
    if (numStr === '0') return 'صفر';

    // Break down the number into chunks of 3 digits
    let words = '';
    let scaleIndex = 0;
    let remainingNum = numStr;

    while (remainingNum.length > 0) {
        const chunkStr = remainingNum.slice(-3); // Get the last 3 digits
        const chunk = parseInt(chunkStr, 10);
        remainingNum = remainingNum.slice(0, -3); // Remove the last 3 digits

        if (chunk !== 0) {
            const chunkWords = convertChunk(chunk);
            words = chunkWords + ' ' + dataUnit.rank[scaleIndex] + ' ' + words;
        }
        scaleIndex++;
    }

    // Remove the last ' و ' if it exists
    words = words.trim().replace(/ و $/, '');
    return words;

    /**
     * Converts a 3-digit chunk to Persian words.
     * @param {number} chunk - A 3-digit number.
     * @returns {string} - The chunk expressed in Persian words.
     */
    function convertChunk(chunk) {
        let chunkWords = '';

        // Handle hundreds place
        if (chunk >= 100) {
            chunkWords += dataUnit.hundreds[Math.floor(chunk / 100)] + ' و ';
            chunk %= 100;
        }

        // Handle tens place
        if (chunk >= 20) {
            chunkWords += dataUnit.tens[Math.floor(chunk / 10)] + ' و ';
            chunk %= 10;
        } else if (chunk >= 10) {
            chunkWords += dataUnit.doubleDigit[chunk - 10] + ' و ';
            chunk = 0;
        }

        // Handle units place
        if (chunk > 0) {
            chunkWords += dataUnit.one[chunk] + ' و ';
        }

        // Remove the last ' و ' if it exists
        return chunkWords.replace(/ و $/, '');
    }
}

export default numberToPersianWords;