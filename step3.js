const fs = require('fs');
const process = require('process');
const axios = require('axios');

// ******* step3.js ***********

// Add a feature where, on the command line, you can optionally provide an argument to output to a file instead of printing to the console. The argument should look like this: --out output-filename.txt readfile-or-url.

// Current features should still work the same.

// However, if --out follows your script name, it should take the next argument and use that as the path to write to.

// Make sure you handle errors trying to write to the file.
function handleOutput(text, out) {
  if (out) {
    fs.writeFile(out, text, 'utf8', function(err) {
      if (err) {
        console.log(`Error writing to ${out}: ${err}`);
        process.exit(1);
      }
    });
  } else {
    console.log(text);
  }
};

function cat(path, out) {
  //  Read the file with the given path
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.log(`Error reading ${path}: ${err}`);
      process.exit(1);
    } else {
    // Print the contents of that file.
    // Whether print to file or console depends on the value of 'out'
    handleOutput(data, out);
    }
  });
};

// REMOVE
// if (process.argv[2] === '--out') {
//   // print the contents of the file 
//   fs.appendFile(process.argv[3], process.argv[4], 'utf8', err => {
//     if (err) {
//       console.log(`Error writing ${process.argv[4]} to ${process.argv[3]}: ${err}`);
//       process.exit(1);
//     }
//     console.log(`Success in writing ${process.argv[4]} to ${process.argv[3]}`);
//   }) 
// }

async function webCat(url, out) {
  try {
    const res = await axios.get(url);
    handleOutput(res.data, out);
  } catch (err) {
    console.error(`Error fetching ${url}: ${err}`);
    process.exit(1);
  }
}

// Modify the code that invoked cat so that, based on the command-line args, it decides whether the argument is a file path or a URL and calls either cat or webCat, respectively.

let out;
let path;

if (process.argv[2] === '--out') {
  out = process.argv[3];
  path = process.argv[4];
} else {
  path = process.argv[2];
}

console.log(path);

// determine if path is a url and call the appropriate function
if (path.slice(0, 4) === 'http') {
  webCat(path, out);
} else {
  cat(path, out);
}



//  ***************** trash ***************
// function cat(path) {
//   //  Read the file with the given path
//   fs.readFile(path, 'utf8', (err, data) => {
//     if (err) {
//       console.log(`Error reading ${path}: ${err}`);
//       process.exit(1);
//     }
//     // Print the contents of that file.
//     if (process.argv[1] === '--out') {
//       // write path to process.argv[2]
//       fs.appendFile(process.argv[2], process.argv[3], 'utf8', err => {
//         if (err) {

//         }
//       }) 
//     } else {
//       console.log(`Contents of ${path}: ${data}`);
//     }
//   });
// };