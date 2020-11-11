const fs = require('fs');
const path = require('path');

let dir = "results";
let folderPath = path.join(__dirname, dir);

const clearFolder = () => {
    // delete directory recursively

    try {
        fs.rmdirSync(folderPath, { recursive: true });

        console.log(`${folderPath} is deleted!`);
    } catch (err) {
        console.error(`Error while deleting ${folderPath}.`);
    }
}

const writeToFile = (data, fileName = `${Date.now().toString()}result`, fileExtension = 'html') => {
    let fullFileName = `${fileName}.${fileExtension}`
    let filePath = path.join(__dirname, dir, fullFileName);
     
    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);

    fs.open(filePath, 'w',(err) => {
        if (err) throw err;
        console.log(`${fullFileName} created at ${folderPath}`);
    });

    fs.writeFile(filePath, data, (err) => {
        if (err) throw err;
        console.log(`Data successfully written to ${fullFileName}`);
    })
}

module.exports = {
    clearFolder,
    writeToFile
}