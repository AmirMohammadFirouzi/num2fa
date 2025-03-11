import copyToClipboard from "./scripts/copyToClipboard.js";
import { fetchData, dataUnit } from "./scripts/fetchData.js";
import convertPersianToEnglishNumbers from "./scripts/convertNumbers.js";
import numberToPersianWords from "./scripts/numberToWords.js";
import { formatNumberInput, removeFormatting } from "./scripts/numberFormatter.js";

// DOM Elements
const convertBtn = document.getElementById('convert');
const inputValue = document.getElementById('inputNumber');
const copyButton = document.getElementById('copyButton');
const resultDiv = document.getElementById('result');

// Constants
const ERROR_MESSAGE = 'خطا در تبدیل عدد!';

/**
 * Displays the converted number in Persian words
 * @param {string|number} resultValue - The value to be converted
 * @returns {Promise<void>}
 */
const showResult = async (resultValue) => {
    if(inputValue.value){
        try {
            // Ensure data is loaded
            await fetchData('/src/constants/data.json');
    
            // Validate input
            if (!resultValue && resultValue !== 0) {
                throw new Error('Invalid input value');
            }
    
            // Convert and display result
            const persianWords = numberToPersianWords(
                String(resultValue),
                dataUnit
            );
    
            // Update UI
            copyButton.classList.remove('hidden');
            resultDiv.classList.add('show');
            resultDiv.textContent = persianWords;
        } catch (error) {
            console.error('Error in showResult:', error);
            resultDiv.textContent = ERROR_MESSAGE;
            copyButton.classList.add('hidden');
        }
    }
    return;
};

// Initialize number formatting on input
formatNumberInput(inputValue);

// Convert button click handler
convertBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    try {
        // Clean and convert input value
        const rawValue = removeFormatting(inputValue);
        const englishNumber = convertPersianToEnglishNumbers(rawValue);

        // Display result
        await showResult(englishNumber);
    } catch (error) {
        console.error('Conversion error:', error);
        resultDiv.textContent = ERROR_MESSAGE;
        copyButton.classList.add('hidden');
    }
});

// Copy button click handler
copyButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const textToCopy = resultDiv.textContent;

    if (textToCopy && textToCopy !== ERROR_MESSAGE) {
        await copyToClipboard(textToCopy);
    } else {
        alert('متن‌ای برای کپی کردن وجود ندارد!');
    }
});

// Auto-select input on focus
inputValue.addEventListener('focus', function () {
    this.select();
});