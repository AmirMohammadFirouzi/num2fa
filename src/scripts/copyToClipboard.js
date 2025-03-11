/**
 * Copies text to clipboard and updates button UI
 * @param {string} text - Text to be copied
 * @returns {Promise<boolean>} - Returns true if successful, false otherwise
 */
const copyToClipboard = async (text) => {
    try {
        // Modern Clipboard API
        if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(text);
            return true;
        }

        // Fallback for older browsers
        const tempInput = document.createElement('input');
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        return true;

    } catch (err) {
        console.error('Copy failed:', err);
        return false;
    }
};

// DOM Elements
const resultDiv = document.getElementById('result');
const copyButton = document.getElementById('copyButton');

// Copy button click handler
copyButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const textToCopy = resultDiv.textContent;

    // Validate content
    if (!textToCopy || textToCopy === 'خطا در تبدیل عدد!') {
        alert('متن‌ای برای کپی کردن وجود ندارد!');
        return;
    }

    try {
        // Update button to loading state
        copyButton.innerHTML = `
            <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" class="opacity-25"></circle>
                <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" class="opacity-75"></path>
            </svg>
        `;

        // Perform copy operation
        const copySuccess = await copyToClipboard(textToCopy);

        // Update UI based on result
        if (copySuccess) {
            copyButton.innerHTML = `
                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 4C18.175 4.01211 19.3529 4.10856 20.1213 4.87694C21 5.75562 21 7.16983 21 9.99826V15.9983C21 18.8267 21 20.2409 20.1213 21.1196C19.2426 21.9983 17.8284 21.9983 15 21.9983H9C6.17157 21.9983 4.75736 21.9983 3.87868 21.1196C3 20.2409 3 18.8267 3 15.9983V9.99826C3 7.16983 3 5.75562 3.87868 4.87694C4.64706 4.10856 5.82497 4.01211 8 4" stroke="currentColor" stroke-width="1.5"/>
                    <path d="M9 13.4L10.7143 15L15 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M8 3.5C8 2.67157 8.67157 2 9.5 2H14.5C15.3284 2 16 2.67157 16 3.5V4.5C16 5.32843 15.3284 6 14.5 6H9.5C8.67157 6 8 5.32843 8 4.5V3.5Z" stroke="currentColor" stroke-width="1.5"/>
                </svg>
                کپی شد!
            `;
            copyButton.classList.remove('hover:text-gray-600', 'text-gray-500');
            copyButton.classList.add('text-green-600');
        } else {
            throw new Error('Copy operation failed');
        }

    } catch (err) {
        console.error('Copy error:', err);
        copyButton.innerHTML = `
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 4C18.175 4.01211 19.3529 4.10856 20.1213 4.87694C21 5.75562 21 7.16983 21 9.99826V15.9983C21 18.8267 21 20.2409 20.1213 21.1196C19.2426 21.9983 17.8284 21.9983 15 21.9983H9C6.17157 21.9983 4.75736 21.9983 3.87868 21.1196C3 20.2409 3 18.8267 3 15.9983V9.99826C3 7.16983 3 5.75562 3.87868 4.87694C4.64706 4.10856 5.82497 4.01211 8 4" stroke="currentColor" stroke-width="1.5"/>
                <path d="M8 3.5C8 2.67157 8.67157 2 9.5 2H14.5C15.3284 2 16 2.67157 16 3.5V4.5C16 5.32843 15.3284 6 14.5 6H9.5C8.67157 6 8 5.32843 8 4.5V3.5Z" stroke="currentColor" stroke-width="1.5"/>
                <path d="M14.5 11L9.50004 16M9.50002 11L14.5 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            خطا!
        `;
        copyButton.classList.remove('hover:text-gray-600', 'text-gray-500');
        copyButton.classList.add('text-red-600');
    }

    // Reset button after 2 seconds
    setTimeout(() => {
        copyButton.innerHTML = `
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 4C18.175 4.01211 19.3529 4.10856 20.1213 4.87694C21 5.75562 21 7.16983 21 9.99826V15.9983C21 18.8267 21 20.2409 20.1213 21.1196C19.2426 21.9983 17.8284 21.9983 15 21.9983H9C6.17157 21.9983 4.75736 21.9983 3.87868 21.1196C3 20.2409 3 18.8267 3 15.9983V9.99826C3 7.16983 3 5.75562 3.87868 4.87694C4.64706 4.10856 5.82497 4.01211 8 4" stroke="currentColor" stroke-width="1.5"/>
                <path d="M8 3.5C8 2.67157 8.67157 2 9.5 2H14.5C15.3284 2 16 2.67157 16 3.5V4.5C16 5.32843 15.3284 6 14.5 6H9.5C8.67157 6 8 5.32843 8 4.5V3.5Z" stroke="currentColor" stroke-width="1.5"/>
                <path d="M15 13L12 13M12 13L9 13M12 13L12 10M12 13L12 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            کپی نتیجه
        `;
        copyButton.classList.remove('text-green-600', 'text-red-600');
        copyButton.classList.add('hover:text-gray-600', 'text-gray-500');
    }, 2000);
});

export default copyToClipboard;