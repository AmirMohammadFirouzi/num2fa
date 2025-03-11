import { fetchData, dataUnit } from "../../assets/js/fetchData.js";
import numberToPersianWords from "../../components/utils/numberToWords.js";

const resultDiv = document.getElementById('result');
const copyButton = document.getElementById('copyButton');

// Make the function async
const ShowResult = async (resultValue) => {
    try {
        // Ensure data is loaded
        await fetchData('/src/assets/data/data.json'); // Wait for data to load

        console.log(resultValue);
        

        // Display the result
        copyButton.classList.remove('hidden');
        resultDiv.classList.add('show');
        resultDiv.textContent = numberToPersianWords(resultValue, dataUnit);
    } catch (error) {
        console.error('Error in ShowResult:', error);
        resultDiv.textContent = 'خطا در بارگیری داده‌ها.';
    }
};

export default ShowResult;