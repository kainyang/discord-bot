const fs = require("fs");
module.exports = {
    jsonReader(fileName, cb) {
        const filePath = `./data/collections/${fileName}.json`;

        fs.readFile(filePath, "utf8", (err, fileData) => {
            if (err) {
                return cb && cb(err);
            }
            try {
                const object = JSON.parse(fileData);
                return cb && cb(null, object);
            } catch (err) {
                return cb && cb(err);
            }
        });
    },

    jsonWriter(fileName, jsonData) {
        const filePath = `./data/collections/${fileName}.json`;
        const jsonString = JSON.stringify(jsonData, null, 2)

        fs.writeFile(filePath, jsonString, err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
            }
        })
    }
}
