const fs = require('fs');
const path = require('path');
const bunbel = path.join(__dirname, '/project-dist/bundle.css');
const styles = path.join(__dirname, 'styles');
let arrResult = [];
async function getInfo(stylesFolder) {
  let stylesFile;
  for (const file of stylesFolder) {
    if(file.slice(file.length - 4, file.length) !== '.css') continue;
    stylesFile = await fs.promises.readFile(`${styles}/${file}`, 'utf8');
    arrResult.push(stylesFile);
  }
}
async function createBundel() {
  const stylesFolder = await fs.promises.readdir(styles);
  await getInfo(stylesFolder);
  await fs.promises.writeFile(bunbel, arrResult.join('\n'), () => {});
}
createBundel();




