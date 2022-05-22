const path = require('path');
const fs = require('fs');

const pathFolder = path.join(__dirname, 'files');
const newFolderPath = path.join(__dirname, 'copy-files');

new Promise((resolve) =>

{
  async function isExist() {
    try {
      await fs.promises.access(`${newFolderPath}`);
      const newFolder =  fs.promises.readdir(newFolderPath);
      return resolve(newFolder);
    } catch (error) {
      null;
    }
  }
  isExist();
})

  .then((newFolder) => {
    for(const file of newFolder) {
      fs.unlink(`${newFolderPath }\\${file}`,  (error) => {
        error ? console.log(error): null;
      });
    }
  }).catch(() => null);


new Promise((resolve) => {

  const folder =  fs.promises.readdir(pathFolder);
  resolve(folder);})
  .then((folder) => { return new Promise((resolve) => {
    fs.mkdir(newFolderPath, () => {});
    resolve(folder, newFolderPath);
  });})
  .then((folder) => {
    for(const file of folder) {
      fs.readFile(`${pathFolder}\\${file}` ,'utf8', (error, data) => {
        error ? console.log(error) : null;
        fs.writeFile(`${newFolderPath }\\${file}`, data, (error) => {
          error ? console.log(error): null;
        });
      });
    }}).catch((error) => console.log(error));

