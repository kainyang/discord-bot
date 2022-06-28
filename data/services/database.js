const fs = require("fs");

function jsonReader(filePath, cb) {
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
}

jsonReader("./data/collections/customer.json", (err, customer) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(customer.address); // => "Infinity Loop Drive"
});


function jsonWriter(filePath, jsonData) {
    const jsonString = JSON.stringify(jsonData, null, 2)

    fs.writeFile(filePath, jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })
}

const customer = {
    name: "Newbie Co.",
    order_count: 0,
    address: "Po Box City",
}

jsonWriter("./data/collections/newCustomer.json", customer);