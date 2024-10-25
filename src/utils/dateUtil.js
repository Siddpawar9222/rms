
// Input Date Format :    2024-09-23 08:12:24
//Format Date Format : Sep 23, 2024, 8:09 AM
function formatDate(dateStr) {

    // Return an empty string if dateStr is null or undefined
    if (!dateStr) {
        return '';
    }

    // Create a new Date object from the provided string
    const date = new Date(dateStr.replace(' ', 'T'));

    // Use Intl.DateTimeFormat to format the date
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
}

export { formatDate };