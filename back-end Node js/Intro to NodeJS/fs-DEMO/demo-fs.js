// first way

// const fs = require('fs')

// const data = fs.readFileSync('../package.json');

// console.log(data.toString());

// create a copy of a file: after the comma we have to include the data we want to write in the file if the file dont exist we create it from scratch. 
// fs.writeFileSync('../package_copy.json', data);

// secound way with promises 

const fs = require('fs/promises');

console.log('before');
handleFiles();
console.log('after');

async function handleFiles(){
    data = await fs.readFile('../package.json');
    console.log(data.toString());
}