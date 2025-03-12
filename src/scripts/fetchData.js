let dataUnit = null;

/**
 * Fetches data from a JSON file and assigns it to the dataUnit variable.
 * @param {string} url - The URL of the JSON file to fetch.
 * @returns {Promise<void>} - A promise that resolves when the data is loaded.
 */

const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        dataUnit = await response.json(); // Assign the parsed JSON object directly
        // console.log('Data loaded:', dataUnit);
    } catch (error) {
        console.error('Error loading JSON:', error);
    }
}

export { fetchData, dataUnit };