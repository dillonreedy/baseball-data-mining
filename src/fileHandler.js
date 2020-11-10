const fs = require('fs');
const path = require('path');

const writeToFile = (data, fileName) => {
    // delete directory recursively
    let dir = "results"

    let folderPath = path.join(__dirname, dir);
    let filePath = path.join(__dirname, dir, fileName);

    try {
        fs.rmdirSync(folderPath, { recursive: true });

        console.log(`${folderPath} is deleted!`);
    } catch (err) {
        console.error(`Error while deleting ${folderPath}.`);
    }
    
    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);

    fs.open(filePath, 'w',(err) => {
        if (err) throw err;
        console.log(`${fileName} created at ${folderPath}`);
    });

    fs.writeFile(filePath, data, (err) => {
        if (err) throw err;
        console.log(`Data successfully written to ${fileName}`);
    })
}

module.exports = {
    writeToFile
}