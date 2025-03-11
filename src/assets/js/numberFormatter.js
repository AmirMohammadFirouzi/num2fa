const numberFormatterFunc = (inputValue) => {
    inputValue.addEventListener('input', function (e) {
        // حذف کاراکترهای غیرمجاز (اعداد، منفی و نقطه)
        let value = this.value.replace(/[^0-9۰-۹\-.]/g, '');
        
        // حذف منفی‌های اضافی (فقط یک منفی در ابتدا)
        value = value.replace(/(?!^)-/g, '');
        
        // جدا کردن بخش‌های عدد
        let [integerPart, decimalPart] = value.split('.');
        const isNegative = integerPart?.startsWith('-') || false;
        
        // پردازش بخش صحیح
        integerPart = integerPart?.replace('-', '') || '';
        
        // محدودیت ۴۳ رقم برای بخش صحیح
        if (integerPart.length > 43) {
            integerPart = integerPart.slice(0, 43); // قطع به ۴۳ رقم
        }
        
        integerPart = formatNumber(integerPart); // افزودن کاما
        
        // محدودیت ۶ رقم برای بخش اعشاری
        if (decimalPart !== undefined && decimalPart.length > 6) {
            decimalPart = decimalPart.slice(0, 6); // قطع به ۶ رقم
        }
        
        // ترکیب مجدد
        let formattedValue = isNegative ? '-' : '';
        formattedValue += integerPart;
        if (decimalPart !== undefined) formattedValue += '.' + decimalPart;
        
        this.value = formattedValue;
    });
};

function formatNumber(numStr) {
    let cleaned = numStr.replace(/,/g, '');
    if (cleaned === '') return '';
    let formatted = cleaned.split('').reverse().join('')
        .match(/.{1,3}/g)
        .join(',')
        .split('').reverse().join('')
        .replace(/^,/, '');
    return formatted;
}

const removeNumberFormatterFunc = (inputValue) => {
    return inputValue.value.replace(/,/g, '');
};

export { numberFormatterFunc, removeNumberFormatterFunc };