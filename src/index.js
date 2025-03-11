import ShowResult from "./../src/assets/js/showResult.js";
import copyToClipboard from "./assets/js/clipboard.js";
import convertPersianToEnglishNumbers from "./assets/js/NumberConvertor.js";
import { numberFormatterFunc, removeNumberFormatterFunc } from "./assets/js/numberFormatter.js";

const convertBtn = document.getElementById('convert');
const inputValue = document.getElementById('inputNumber');


const copyButton = document.getElementById('copyButton');
const resultDiv = document.getElementById('result');


// اعمال فرمت‌دهی ۳ رقم ۳ رقم روی input
numberFormatterFunc(inputValue);

convertBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    // حذف کاماها و فرمت‌دهی برای پردازش عدد
    const cleanedValue = removeNumberFormatterFunc(inputValue);

    // تبدیل اعداد فارسی به انگلیسی
    const englishNumber = convertPersianToEnglishNumbers(cleanedValue);

    // نمایش نتیجه (بدون استفاده از parseFloat)
    ShowResult(englishNumber);

    copyButton.addEventListener('click', async (e) => {
        e.preventDefault(); // جلوگیری از رفتار پیش‌فرض دکمه
        const textToCopy = resultDiv.textContent; // دریافت متن از result
        if (textToCopy) {
            await copyToClipboard(textToCopy); // کپی کردن متن
        } else {
            alert('متن‌ای برای کپی کردن وجود ندارد!');
        }
    });


});

inputValue.addEventListener('focus', function () {
    this.select();
})
