
const csv = require('csv-parser');
const fs = require('fs');

const a = [];
fs.createReadStream('deviceTypeManufacturer.csv')
.pipe(csv())
.on('data', (row) => {
    a.push(row);
    // console.log(row);
})
.on('end', () => {
    // console.log(a);
    console.log("const deviceTypeManufacturer = [");

    a.forEach(b => {
        console.log(b, ",")
    });

    console.log("];")

    // console.log('CSV file successfully processed');
});
