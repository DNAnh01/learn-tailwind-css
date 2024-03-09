export const convertRawViewsToString = (labelValue: String, isSub = false): string => {
    /**
     * @description
     * This function takes a number and returns a string representing the number in a more human-readable format.
     * @param labelValue - The number to be converted.
     * @param isSub - A boolean to determine if the number is a subscriber count.
     * @returns - The number in a more human-readable format.
     * @example
     * convertRawViewsToString(1000) // 1K
     * convertRawViewsToString(1000000) // 1M
     * convertRawViewsToString(1000000000) // 1B
     * convertRawViewsToString(1000000000, true) // 1.00B
     * convertRawViewsToString(1000000, true) // 1.00M
     * convertRawViewsToString(1000, true) // 1.00K
     * convertRawViewsToString(100) // 100
     * convertRawViewsToString(100, true) // 100
     * convertRawViewsToString(1000000, true) // 1.00M
     * convertRawViewsToString(1000000000, true) // 1.00B
     * convertRawViewsToString(1000000000, true) // 1.00B
     * convertRawViewsToString(1000000000, true) // 1.00B
     */
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e9
        ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(0) + 'B'
        : // Six Zeroes for Millions
        Math.abs(Number(labelValue)) >= 1.0e6
        ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(0) + 'M'
        : // Three Zeroes for Thousands
        Math.abs(Number(labelValue)) >= 1.0e3
        ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(isSub ? 2 : 0) + 'K'
        : Math.abs(Number(labelValue)).toString();
};
