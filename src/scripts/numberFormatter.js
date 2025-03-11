/**
 * Formats numeric input with thousand separators and decimal handling
 * @param {HTMLInputElement} inputValue - The input element to format
 */
const formatNumberInput = (inputValue) => {
    inputValue.addEventListener('input', function (e) {
        // Remove invalid characters (keep numbers, persian numbers, minus, and decimal)
        let value = this.value.replace(/[^0-9۰-۹\-.]/g, '');
        
        // Remove extra minus signs (only allow leading minus)
        value = value.replace(/(?!^)-/g, '');
        
        // Split into integer and decimal parts
        let [integerPart, decimalPart] = value.split('.');
        const isNegative = integerPart?.startsWith('-') || false;
        
        // Process integer part
        integerPart = integerPart?.replace('-', '') || '';
        
        // Limit integer part to 43 digits
        if (integerPart.length > 43) {
            integerPart = integerPart.slice(0, 43);
        }
        
        integerPart = formatNumber(integerPart); // Add thousand separators
        
        // Limit decimal part to 6 digits
        if (decimalPart !== undefined && decimalPart.length > 6) {
            decimalPart = decimalPart.slice(0, 6);
        }
        
        // Reconstruct formatted value
        let formattedValue = isNegative ? '-' : '';
        formattedValue += integerPart;
        if (decimalPart !== undefined) formattedValue += '.' + decimalPart;
        
        this.value = formattedValue;
    });
};

/**
 * Formats a numeric string with thousand separators
 * @param {string} numStr - Numeric string to format
 * @returns {string} Formatted string with commas
 */
function formatNumber(numStr) {
    // Remove existing commas and handle empty case
    let cleaned = numStr.replace(/,/g, '');
    if (cleaned === '') return '';
    
    // Add commas using reverse string manipulation
    let formatted = cleaned.split('').reverse().join('')
        .match(/.{1,3}/g)
        .join(',')
        .split('').reverse().join('')
        .replace(/^,/, ''); // Remove leading comma if exists
    
    return formatted;
}

/**
 * Removes formatting commas from input value
 * @param {HTMLInputElement} inputValue - The input element
 * @returns {string} Raw numeric value without formatting
 */
const removeFormatting = (inputValue) => {
    return inputValue.value.replace(/,/g, '');
};

export { formatNumberInput, removeFormatting };