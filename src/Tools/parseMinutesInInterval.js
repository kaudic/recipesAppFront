const twoStringsChecker = (str) => {
    if (str.toString().length < 2) {
        str = '0' + str;
    }
    return str;
}

const parseMinutesInInterval = (min) => {
    let minutes = min % 60;
    let hours = Math.floor(((min - minutes) / 60));
    return `${twoStringsChecker(hours)}:${twoStringsChecker(minutes)}:00`
}

export default parseMinutesInInterval;