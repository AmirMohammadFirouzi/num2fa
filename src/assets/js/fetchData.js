let dataUnit = null;

// Fetch data from JSON file (run this once at the start of your application)
const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        dataUnit = await response.json(); // Assign the parsed JSON object directly
        console.log('Data loaded:', dataUnit);
    } catch (error) {
        console.error('Error loading JSON:', error);
    }
}

export { fetchData, dataUnit };