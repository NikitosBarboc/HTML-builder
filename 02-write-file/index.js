const fs = require('fs');
const {stdout, stdin} = process;
fs.createWriteStream('./text.txt');

stdout.write('Hello, please write some text.\n');
stdin.on('data', input => {
  fs.readFile('./text.txt', 'utf8', (error, data) => {
    error ? console.log(error) : null;
    input = input.toString();
    if(input.includes('\r' )) {
      input = input.slice(0, input.length - 2);
    } else {
      input = input.slice(0, input.length - 1);
    }
    if(input === 'exit') {
      process.exit();
    }

    fs.writeFile('./text.txt',   `${data}${input}`, (error => {
      error ? console.log(error) : null;}));
  });
});
process.on('exit', () => stdout.write('Удачи!'));
process.on('SIGINT', () => process.exit());