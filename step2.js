const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat(path) {
  //  Read the file with the given path
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.log(`Error reading ${path}: ${err}`);
      process.exit(1);
    }
    // Print the contents of that file.
    console.log(`Contents of ${path}: ${data}`);
  });
};

// Print the contents of the file that is at index 2 in argv
// cat(process.argv[2]);


// ******* step2.js ***********
// Copy over your step1.js code to step2.js

// Add a new function, webCat. This should take a URL and, using axios, should read the content of that URL and print it to the console.

async function webCat(url) {
  try {
    const res = await axios.get(url);
    console.log(res.data);
  } catch (err) {
    console.error(`(error) Error fetching ${url}: ${err}`);
    console.log(`(log) Error fetching ${url}: ${err}`);
    process.exit(1);
  }
}

// Modify the code that invoked cat so that, based on the command-line args, it decides whether the argument is a file path or a URL and calls either cat or webCat, respectively.

let path = process.argv[2];

if (path.slice(0, 4) === 'http') {
  webCat(path);
} else {
  cat(path);
}