export const getArrFromNum = num => Array.from({ length: num }, (_, index) => index + 1)

export const getExt = (url) => url.split(/[#?]/)[0].split('.').pop().trim();

export const readCSVFile = (csv) => {
    const lines = csv.split('\n');
    const result = [];
    const headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentLine = lines[i].split(',');

        for (let j = 0; j < headers.length; j++) {
            const key = headers[j].trim();
            const value = currentLine[j].trim();
            obj[key] = value;
        }

        result.push(obj);
    }

    return result;
};