
/**
 * This function calculates the time difference between the current date and a given date, and returns a human-readable string indicating how long ago that date was. It handles various time intervals such as days, months, and years, and provides specific messages for "today" and "yesterday".
 * @param {string} date - The date to compare with the current date, in a format that can be parsed by the Date constructor.
 * @returns {string} A string indicating how long ago the given date was, such as "today", "yesterday", "X days ago", "X months ago", or "X years ago".
 */

function getDayQuantityText(date) {
    // Validação
    if (!date || isNaN(new Date(date).getTime())) {
        return 'Invalid date'
    }

    const days = Math.floor((new Date() - new Date(date)) / (1000 * 60 * 60 * 24))
    const months = Math.floor(days / 30)
    const years = Math.floor(months / 12)
    if (days === 0) {
        return 'today'
    } else if (days === 1) {
        return 'yesterday'
    } else if (days > 1 && days < 30) {
        return `${days} days ago`
    } else if (months === 1) {
        return `1 month ago`
    } else if (months > 1 && months < 12) {
        return `${months} months ago`
    } else if (years === 1) {
        return `1 year ago`
    } else if (months >= 12) {
        return `${years} years ago`
    }
}

export default getDayQuantityText