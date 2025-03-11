function convertPersianToEnglishNumbers(input) {
    if (input === undefined || input === null) {
        return '';
    }
    if (typeof input === 'number') {
        input = input.toString();
    }
    if (typeof input !== 'string') {
        return '';
    }

    const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let output = input;
    for (let i = 0; i < persianNumbers.length; i++) {
        const regex = new RegExp(persianNumbers[i], 'g');
        output = output.replace(regex, englishNumbers[i]);
    }

    return output;
}

export default convertPersianToEnglishNumbers;