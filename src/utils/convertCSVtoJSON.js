// myScript.js
import csv from 'csvtojson';
import fs from 'fs';

// Get filename from CLI arguments
const args = process.argv.slice(2); // Skip the first two elements
let filename = '';

// Parse the filename argument
args.forEach((arg) => {
    if (arg.startsWith('--filename=')) {
        filename = arg.split('=')[1];
    }
});

// Check if the filename argument is provided
if (!filename) {
    console.error('Please provide the --filename argument.');
    process.exit(1);
}

// Define input and output paths using the same filename with different extensions
const inputFile = `src/data/${filename}.csv`;
const outputFile = `src/data/${filename}.json`;

// Convert CSV to JSON and save
csv()
    .fromFile(inputFile)
    .then((jsonObj) => {
        fs.writeFileSync(outputFile, JSON.stringify(jsonObj, null, 2));
    });
