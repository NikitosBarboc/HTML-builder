const fs = require('fs');
const result = fs.createReadStream('./text.txt', 'utf-8');
result.on('data', chunk => console.log(chunk));




