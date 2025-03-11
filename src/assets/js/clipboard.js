const copyToClipboard = async (text) => {
    try {
        // استفاده از Clipboard API (روش مدرن)
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text);
        } else {
            // Fallback: استفاده از execCommand (روش قدیمی)
            const tempInput = document.createElement('input');
            tempInput.value = text;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
        }
        alert('متن با موفقیت کپی شد!');
    } catch (err) {
        console.error('خطا در کپی کردن متن:', err);
        alert('خطا در کپی کردن متن!');
    }
};


export default copyToClipboard;