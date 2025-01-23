import fs from 'node:fs';
const filePath = `01-read-file/text.txt`;
const stream = fs.createReadStream(filePath, 'utf8');

stream.on('data', (chunk) => {
    console.log(chunk); 
  });
  
  stream.on('error', (err) => {
    console.error(err);
  });