const path = require('path');
const fs = require('fs');

async function getInfoFromFolder() {
  const pathFolder = path.join(__dirname, 'secret-folder');
  const folder = await fs.promises.readdir(pathFolder, {withFileTypes: true});

  for(let file of folder) {
    let res = '';
    file.isFile() ?  res += path.parse(file.name).name + ' - ' + path.parse(file.name).ext.slice(1) : null;
    let pathStat = path.join(__dirname, 'secret-folder' , file.name);
    fs.stat(pathStat, (err, stats) => {
      // err ? console.log(err) : null;

      res +=  ` - ${stats.size}b`;
      // console.log(stats.size)
      if(file.isFile() ) {
        res.length > 7 ? console.log(res) : null;
      }
    });
  }

}
getInfoFromFolder();
