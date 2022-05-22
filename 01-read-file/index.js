const fs = require('fs');
const path = require('path');
const result = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
result.on('data', chunk => console.log(chunk));




