export const parseVideoDuration = (duration: string): string => {
    /**
     * Parse the duration of the video and return it in the format of HH:MM:SS
     * @param {string} duration - The duration of the video
     * @returns {string} - The duration of the video in the format of HH:MM:SS
     * @example
     * parseVideoDuration('PT1H2M3S') // returns '1:02:03'
     * parseVideoDuration('PT2M3S') // returns '0:02:03'
     * parseVideoDuration('PT3S') // returns '0:00:03'
     */
    const durationParts: string[] = duration
        .replace('PT', '')
        .replace('H', ':')
        .replace('M', ':')
        .replace('S', '')
        .split(':'); // ['1', '2', '3']

    if (durationParts.length === 3) {
        return `${durationParts[0]}:${parseInt(durationParts[1]) < 9 ? `0${durationParts[1]}` : durationParts[1]}:${
            parseInt(durationParts[2]) < 9 ? `0${durationParts[2]}` : durationParts[2]
        }`;
    }

    if (durationParts.length === 2) {
        return `${durationParts[0]}:${parseInt(durationParts[1]) < 9 ? `0${durationParts[1]}` : durationParts[1]}`;
    }

    if (durationParts.length === 1) {
        return `0:${parseInt(durationParts[0]) < 9 ? `0${durationParts[0]}` : durationParts[0]}`;
    }

    return '';
};
