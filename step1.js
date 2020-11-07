const fs = require('fs');
const process = require('process');

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
cat(process.argv[2]);