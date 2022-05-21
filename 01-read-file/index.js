const fs = require('fs');
const output = fs.createReadStream('./01-read-file/text.txt', 'utf-8');
output.on('data', chunk => console.log(chunk));

