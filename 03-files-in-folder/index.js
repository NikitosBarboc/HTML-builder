const path = require('path');
// const {Dirent} = require('fs');
const fs = require('fs');

async function dd() {
  const pathFolder = path.join(__dirname, 'secret-folder');
  const folder = await fs.promises.readdir(pathFolder, {withFileTypes: true});

  for(let file of folder) {
    let res = '';
    file.isFile() ?  res += path.parse(file.name).name + ' - ' + path.parse(file.name).ext.slice(1)  : null;
    let pathStat = pathFolder + '\\' + file.name;
    fs.stat(pathStat, (err, stats) => {
      err ? console.log(err) : null;
      res +=  ` - ${stats.size}b`;
      res !== ' - 0b' ? console.log(res) : null;
    });
    // console.log(pathFolder + '\\' + file.name);

  }

}
dd();
// {withFileTypes: true} .isFile(folder)